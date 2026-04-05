import express from "express";
import BlogPost from "../models/BlogPost.js";

const router = express.Router();

/** Danh sách slug đã xuất bản — dùng cho sitemap */
router.get("/slugs", async (req, res) => {
  try {
    const slugs = await BlogPost.find({ published: true })
      .select("slug updatedAt")
      .lean();
    return res.json({ slugs });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

/** Danh sách bài public */
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find({ published: true })
      .sort({ publishedAt: -1 })
      .select(
        "slug title excerpt metaDescription ogImage publishedAt updatedAt authorName",
      )
      .lean();
    return res.json({ posts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

/** Chi tiết theo slug (chỉ bài đã xuất bản) */
router.get("/:slug", async (req, res) => {
  try {
    const post = await BlogPost.findOne({
      slug: req.params.slug,
      published: true,
    }).lean();
    if (!post) {
      return res.status(404).json({ error: "Không tìm thấy bài viết" });
    }
    return res.json({ post });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

export default router;
