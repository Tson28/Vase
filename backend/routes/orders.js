import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

function randomId() {
  return "VASE-" + Math.random().toString(36).slice(2, 11).toUpperCase();
}

function buildDelivery(line) {
  const isService =
    line.category === "Dịch vụ MXH" || Boolean(line.metadata?.link);
  if (isService) {
    return {
      lineKey: line.id,
      type: "service",
      title: line.name,
      message:
        "Đơn dịch vụ đã được đưa vào hàng đợi xử lý tự động. Bạn sẽ nhận cập nhật tiến độ qua email trong 5–30 phút.",
      detail: {
        link: line.metadata?.link ?? null,
        quantity: line.metadata?.quantity ?? line.qty,
        platform: line.metadata?.platform ?? null,
        qty: line.qty,
      },
    };
  }
  return {
    lineKey: line.id,
    type: "account",
    title: line.name,
    message:
      "Tài khoản đã sẵn sàng. Kiểm tra email để nhận thông tin đăng nhập (demo).",
    detail: {
      loginHint: `user_${line.id}@vase-delivery.local`,
      qty: line.qty,
      note: "Đây là dữ liệu demo. Thay PAYMENT_* bằng URL API cổng thanh toán thật.",
    },
  };
}

function defaultPaymentLinks() {
  return {
    momo:
      process.env.PAYMENT_MOMO_URL ||
      "https://payment-placeholder.vase.local/momo",
    vnpay:
      process.env.PAYMENT_VNPAY_URL ||
      "https://payment-placeholder.vase.local/vnpay",
    bank:
      process.env.PAYMENT_BANK_URL ||
      "https://payment-placeholder.vase.local/bank",
    note:
      "Link ảo — thay PAYMENT_MOMO_URL, PAYMENT_VNPAY_URL, PAYMENT_BANK_URL trong .env bằng URL API tài khoản của bạn.",
  };
}

router.post("/", async (req, res) => {
  try {
    const email = String(req.body.email ?? "").trim();
    const paymentMethod = String(req.body.paymentMethod ?? "momo");
    const items = Array.isArray(req.body.items) ? req.body.items : [];

    if (!email) {
      return res.status(400).json({ error: "Thiếu email" });
    }
    if (items.length === 0) {
      return res.status(400).json({ error: "Giỏ hàng trống" });
    }

    for (const it of items) {
      if (
        !it.id ||
        !it.name ||
        typeof it.price !== "number" ||
        typeof it.qty !== "number"
      ) {
        return res.status(400).json({ error: "Dữ liệu sản phẩm không hợp lệ" });
      }
    }

    const total = items.reduce((s, it) => s + it.price * it.qty, 0);
    const orderId = randomId();
    const deliveries = items.map((it) => buildDelivery(it));
    const paymentLinks = defaultPaymentLinks();

    const doc = await Order.create({
      orderId,
      email,
      paymentMethod,
      total,
      items,
      deliveries,
      status: "pending_payment",
      paymentLinks,
    });

    return res.status(201).json({
      orderId: doc.orderId,
      createdAt: doc.createdAt.toISOString(),
      email: doc.email,
      paymentMethod: doc.paymentMethod,
      total: doc.total,
      items: doc.items,
      deliveries: doc.deliveries,
      paymentLinks: doc.paymentLinks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Không tạo được đơn hàng" });
  }
});

export default router;
