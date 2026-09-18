import { model, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "نام کاربر الزامی است"],
      trim: true,
      minLength: [3, "نام باید حداقل ۳ کاراکتر باشد"],
      maxLength: [50, "نام نمی‌تواند بیشتر از ۵۰ کاراکتر باشد"],
    },
    email: {
      type: String,
      required: [true, "ایمیل کاربر الزامی است"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "لطفاً یک آدرس ایمیل معتبر وارد کنید",
      ],
    },
    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
      minLength: [6, "رمز عبور باید حداقل ۶ کاراکتر باشد"],
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (doc, ret) => {
        delete ret.password;
        return ret;
      },
    },
  },
);

const UserModel = model("user", userSchema);

export default UserModel;
