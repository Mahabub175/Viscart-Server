import { model, Schema } from "mongoose";
import { Status } from "../../interface/global/global.interface";
import { IGlobalSetting } from "./globalSetting.interface";

const globalSettingSchema = new Schema<IGlobalSetting>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart",
    },
    description: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart Description",
    },
    businessNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart Number",
    },
    businessAddress: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart Address",
    },
    businessLocation: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart Location",
    },
    businessSlogan: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "Viscart Slogan",
    },
    primaryColor: { type: String, default: "" },
    secondaryColor: { type: String, default: "" },
    logo: { type: String, default: "" },
    favicon: { type: String, default: "" },
    currency: { type: String, default: "BDT" },
    ssl: { type: String, default: "Active" },
    status: {
      type: String,
      enum: Object.values(Status),
      trim: true,
      default: Status.ACTIVE,
    },
  },
  { timestamps: true }
);

export const globalSettingModel = model<IGlobalSetting>(
  "globalSetting",
  globalSettingSchema
);
