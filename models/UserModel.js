import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//     username: {
//         type:String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     // isVerified: {
//     //     type: Boolean,
//     //     default: false,
//     // },
//     // forgotPasswordToken: String,
//     // forgotPasswordTokenExpiry: Date,
//     // verifyToken: String,
//     // verifyTokenExpiry: Date,
// },
// {
//     // this keeps a track of the createdAt and updateAt timestamps
//     timestamps: true,
// });

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    // isVerified: {
    //     type: Boolean,
    //     default: false,
    // },
    // forgotPasswordToken: String,
    // forgotPasswordTokenExpiry: Date,
    // verifyToken: String,
    // verifyTokenExpiry: Date,
  },
  {
    // this keeps a track of the createdAt and updateAt timestamps
    timestamps: true,
  }
);

const User = new mongoose.model("user", userSchema);

export default User;
