import { model, Schema } from "mongoose";

const mediaSchema = new Schema(
  {
    url: {
      type: String,
      required: [true, "آدرس رسانه الزامی است"],
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const MediaModel = model("media", mediaSchema);

export default MediaModel;
