import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import nodemailer from "nodemailer";
import User from "../models/User.js";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || "smtp.ethereal.email",
  port: Number(process.env.MAIL_PORT || 587),
  secure: process.env.MAIL_SECURE === "true",
  auth: process.env.MAIL_USER
    ? {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    : undefined,
});

async function sendOtpEmail(email, code) {
  const sendInfo = await transporter.sendMail({
    from: process.env.MAIL_FROM || "no-reply@vase.local",
    to: email,
    subject: "Mã OTP đăng nhập Vase",
    text: `Mã OTP của bạn là ${code}. Hết hạn trong 10 phút.`,
    html: `<p>Mã OTP của bạn là <strong>${code}</strong>. Hết hạn trong 10 phút.</p>`,
  });

  console.log("OTP email sent", sendInfo.messageId);
  return sendInfo;
}

const JWT_SECRET = process.env.JWT_SECRET || "dev-only-change-me-in-production";

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "7d" },
  );
};

// Đăng ký local
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, passwordHash, provider: "local" });
    await user.save();

    const token = signToken(user);
    res.status(201).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error đăng ký" });
  }
});

// Đăng nhập local
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email, password required" });
    }

    const user = await User.findOne({ email, provider: "local" });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    const token = signToken(user);
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error đăng nhập" });
  }
});

// Yêu cầu OTP qua email
router.post("/request-otp", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email required" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        name: email.split("@")[0] || "Người dùng",
        email,
        provider: "local",
      });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otpCode = otpCode;
    user.otpExpires = otpExpires;
    await user.save();

    await sendOtpEmail(email, otpCode);

    res.json({ message: "OTP đã gửi. Kiểm tra email của bạn." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server khi gửi OTP" });
  }
});

// Xác thực OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otpCode } = req.body;
    if (!email || !otpCode) {
      return res.status(400).json({ message: "email và otpCode required" });
    }

    const user = await User.findOne({ email });
    if (!user || !user.otpCode || !user.otpExpires) {
      return res.status(400).json({ message: "OTP không hợp lệ" });
    }

    if (user.otpCode !== otpCode) {
      return res.status(400).json({ message: "OTP không đúng" });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: "OTP đã hết hạn" });
    }

    user.otpCode = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = signToken(user);
    res.json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server verify OTP" });
  }
});

router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Không có token" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Không có token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-passwordHash");
    if (!user)
      return res.status(404).json({ message: "Người dùng không tồn tại" });
    res.json({ user });
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token không hợp lệ" });
  }
});

// OAuth Google + Github
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  },
);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] }),
);
router.get(
  "/github/callback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: `${process.env.CLIENT_URL}/login`,
  }),
  (req, res) => {
    const token = signToken(req.user);
    res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`);
  },
);

export default router;
