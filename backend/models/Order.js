import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    id: String,
    name: String,
    price: Number,
    qty: Number,
    category: String,
    emoji: String,
    metadata: { type: mongoose.Schema.Types.Mixed },
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    email: { type: String, required: true },
    paymentMethod: { type: String, default: "momo" },
    total: { type: Number, required: true },
    items: [orderItemSchema],
    deliveries: { type: [mongoose.Schema.Types.Mixed], default: [] },
    status: {
      type: String,
      enum: ["pending_payment", "paid", "cancelled"],
      default: "pending_payment",
    },
    paymentLinks: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
