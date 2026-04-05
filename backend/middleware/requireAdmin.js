/**
 * Bảo vệ route admin: header x-admin-key === ADMIN_API_KEY
 */
export default function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  const expected = process.env.ADMIN_API_KEY;
  if (!expected) {
    console.warn("ADMIN_API_KEY chưa cấu hình — /api/admin/* bị chặn");
    return res.status(503).json({ error: "Admin API chưa cấu hình trên server" });
  }
  if (!key || key !== expected) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}
