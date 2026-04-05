import express from "express";
import BlogPost from "../models/BlogPost.js";
import requireAdmin from "../middleware/requireAdmin.js";
import { slugify } from "../utils/slugify.js";

const router = express.Router();
router.use(requireAdmin);

router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .sort({ updatedAt: -1 })
      .select(
        "slug title excerpt published publishedAt metaTitle metaDescription updatedAt createdAt",
      )
      .lean();
    return res.json({ posts });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body || {};
    let slug = slugify(body.slug || body.title || "");
    if (!slug) {
      return res.status(400).json({ error: "Cần tiêu đề hoặc slug" });
    }
    const exists = await BlogPost.findOne({ slug });
    if (exists) {
      slug = `${slug}-${Date.now().toString(36)}`;
    }

    const published = Boolean(body.published);
    const publishedAt = published
      ? body.publishedAt
        ? new Date(body.publishedAt)
        : new Date()
      : undefined;

    const doc = await BlogPost.create({
      slug,
      title: String(body.title || "").trim(),
      excerpt: String(body.excerpt || ""),
      content: String(body.content || ""),
      metaTitle: String(body.metaTitle || ""),
      metaDescription: String(body.metaDescription || ""),
      keywords: String(body.keywords || ""),
      ogImage: String(body.ogImage || ""),
      authorName: String(body.authorName || "Vase.Com"),
      published,
      publishedAt: published ? publishedAt : undefined,
    });

    return res.status(201).json({ post: doc });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Không tạo được bài viết" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id).lean();
    if (!post) return res.status(404).json({ error: "Không tìm thấy" });
    return res.json({ post });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ error: "Không tìm thấy" });

    const body = req.body || {};
    if (body.title != null) post.title = String(body.title).trim();
    if (body.excerpt != null) post.excerpt = String(body.excerpt);
    if (body.content != null) post.content = String(body.content);
    if (body.metaTitle != null) post.metaTitle = String(body.metaTitle);
    if (body.metaDescription != null)
      post.metaDescription = String(body.metaDescription);
    if (body.keywords != null) post.keywords = String(body.keywords);
    if (body.ogImage != null) post.ogImage = String(body.ogImage);
    if (body.authorName != null) post.authorName = String(body.authorName);

    if (body.slug != null) {
      const s = slugify(body.slug);
      if (s && s !== post.slug) {
        const clash = await BlogPost.findOne({ slug: s, _id: { $ne: post._id } });
        if (clash) {
          return res.status(409).json({ error: "Slug đã tồn tại" });
        }
        post.slug = s;
      }
    }

    if (body.published != null) {
      post.published = Boolean(body.published);
      if (post.published && !post.publishedAt) {
        post.publishedAt = new Date();
      }
      if (!post.published) {
        post.publishedAt = undefined;
      }
    }
    if (body.publishedAt != null && post.published) {
      post.publishedAt = new Date(body.publishedAt);
    }

    await post.save();
    return res.json({ post });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Không cập nhật được" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const r = await BlogPost.findByIdAndDelete(req.params.id);
    if (!r) return res.status(404).json({ error: "Không tìm thấy" });
    return res.json({ ok: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Lỗi server" });
  }
});

export default router;
