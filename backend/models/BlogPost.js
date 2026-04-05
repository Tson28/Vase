import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    keywords: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    authorName: { type: String, default: "Vase.Com" },
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

blogPostSchema.index({ published: 1, publishedAt: -1 });

const BlogPost =
  mongoose.models.BlogPost || mongoose.model("BlogPost", blogPostSchema);
export default BlogPost;
