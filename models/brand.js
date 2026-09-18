import { model, Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام برند الزامی است"],
      unique: true,
      trim: true,
    },
    logo: {
      type: String,
      required: [true, "لوگوی برند الزامی است"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const BrandModel = model("brand", brandSchema);

export default BrandModel;
