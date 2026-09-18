import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام دسته‌بندی الزامی است"],
      unique: true,
      trim: true,
    },
    en_name: {
      type: String,
      required: [true, "نام انگلیسی دسته‌بندی الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: [true, "تصویر دسته‌بندی الزامی است"],
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  },
);

categorySchema.virtual("products", {
  ref: "product",
  localField: "_id",
  foreignField: "category",
});

const CategoryModel = model("category", categorySchema);

export default CategoryModel;
