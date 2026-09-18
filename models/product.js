import { model, Types, Schema } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام محصول الزامی است"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "قیمت محصول الزامی است"],
      min: [0, "قیمت محصول نمی‌تواند منفی باشد"],
    },
    sale: {
      type: Number,
      default: 0,
      min: [0, "تخفیف نمی‌تواند منفی باشد"],
      max: [100, "تخفیف نمی‌تواند بیشتر از ۱۰۰ درصد باشد"],
      index: true,
    },
    media: [
      {
        type: Types.ObjectId,
        ref: "media",
      },
    ],
    category: {
      type: Types.ObjectId,
      ref: "category",
      required: [true, "دسته‌بندی محصول الزامی است"],
      index: true,
    },
    brand: {
      type: Types.ObjectId,
      ref: "brand",
      required: [true, "برند محصول الزامی است"],
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const ProductModel = model("product", productSchema);

export default ProductModel;
