import { model, Schema } from "mongoose";
import { Status } from "../../interface/global/global.interface";
import { IWishlist } from "./wishlist.interface";

const wishlistSchema = new Schema<IWishlist>(
  {
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    product: { type: Schema.Types.ObjectId, ref: "product", required: true },
    status: {
      type: String,
      enum: Object.values(Status),
      trim: true,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

export const wishlistModel = model<IWishlist>("wishlist", wishlistSchema);
