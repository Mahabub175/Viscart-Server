import { model, Schema } from "mongoose";
import { Status } from "../../interface/global/global.interface";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    number: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    paymentType: { type: String, enum: ["manual", "ssl"], required: true },
    paymentMethod: { type: String, trim: true },
    code: { type: String, trim: true },
    deliverOption: { type: String, trim: true },
    subTotal: { type: Schema.Types.Mixed, trim: true },
    shippingFee: { type: Schema.Types.Mixed, trim: true },
    discount: { type: Schema.Types.Mixed, trim: true },
    grandTotal: { type: Schema.Types.Mixed, trim: true },
    tranId: { type: String, trim: true },
    paymentStatus: { type: String, trim: true },
    deliveryStatus: { type: String, trim: true, default: "pending" },
    status: {
      type: String,
      enum: Object.values(Status),
      trim: true,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

export const orderModel = model<IOrder>("order", orderSchema);
