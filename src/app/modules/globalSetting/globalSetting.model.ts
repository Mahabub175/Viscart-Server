import { model, Schema } from "mongoose";
import { Status } from "../../interface/global/global.interface";
import { IGlobalSetting } from "./globalSetting.interface";

const globalSettingSchema = new Schema<IGlobalSetting>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart",
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Description",
    },
    businessNumber: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Number",
    },
    businessAddress: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Address",
    },
    businessLocation: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Location",
    },
    businessSlogan: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Slogan",
    },
    businessEmail: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Email",
    },
    businessFacebook: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Facebook",
    },
    businessInstagram: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Instagram",
    },
    businessTwitter: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Twitter",
    },
    businessLinkedin: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Linkedin",
    },
    businessYoutube: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Linkedin",
    },
    businessWhatsapp: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Whatsapp",
    },
    businessWorkHours: {
      type: String,
      required: true,
      trim: true,
      default: "Viscart Work Hours",
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
