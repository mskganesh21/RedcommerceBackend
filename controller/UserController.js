import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import User from "../models/UserModel.js";
import { validateEmail } from "../utils/emailValidator.js";
import { validatePassword } from "../utils/validatepassword.js";
import { validateUsername } from "../utils/validateusername.js";
import { cloudinaryupload } from "../services/cloudinary.js";

// this is the Register api route
// const RegisterUser = async (req, res) => {
//     const { username, email, password } = req.body;
//     console.log(req.body);

//     //validate request body
//     const isvalidemail = validateEmail(email);
//     const isvalidpassword = validatePassword(password);
//     const isvalidUsername = validateUsername(username);

//     //if email is invalid then return
//     if (!isvalidemail) {
//     return res.status(422).json({
//         error: true,
//         success:false,
//         data: "Invalid email format"
//     });
//     }

//     //if password is invalid then return
//     if (!isvalidpassword) {
//         return res.status(422).json({
//             error: true,
//             success:false,
//             data: "Invalid Password format"
//         });
//     }

//     if(!isvalidUsername){
//         return res.status(422).json({
//             error: true,
//             success:false,
//             data: "Invalid username format"
//         });
//     }

//         //find if a user already exists
//         const user = await User.findOne({ email });
//         if (user) {
//         return res.status(409).json({
//             error: true,
//             success: false,
//             data: "User already registered. Please try with a different email"
//         })
//         }

//     try {
//       const salt = await bcryptjs.genSalt(10);
//       const hashedPassword = await bcryptjs.hash(password, salt);
//       const user = await User.create({
//         username,
//         email,
//         password: hashedPassword,
//       });
//       return res.status(201).json({
//         error: false,
//         success: true,
//         data: "User created successfully"
//       })
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         error: true,
//         success: false,
//         data: "Something wen't wrong. Please try again"
//       })
//     }
//   };

const RegisterUser = async (req, res) => {
  const { username, email, password, profileImage } = req.body;
  console.log(req.body);

  //validate request body
  const isvalidemail = validateEmail(email);
  const isvalidpassword = validatePassword(password);
  const isvalidUsername = validateUsername(username);

  //if email is invalid then return
  if (!isvalidemail) {
    return res.status(422).json({
      error: true,
      success: false,
      data: "Invalid email format",
    });
  }

  //if password is invalid then return
  if (!isvalidpassword) {
    return res.status(422).json({
      error: true,
      success: false,
      data: "Invalid Password format",
    });
  }

  if (!isvalidUsername) {
    return res.status(422).json({
      error: true,
      success: false,
      data: "Invalid username format",
    });
  }

  //find if a user already exists
  const user = await User.findOne({ email });
  if (user) {
    return res.status(409).json({
      error: true,
      success: false,
      data: "User already registered. Please try with a different email",
    });
  }

  try {

    const result = await cloudinaryupload(profileImage);
    console.log(result, "aabbcc")
    if(result.status === true){

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      avatar: result?.data?.public_id,
    });
    return res.status(201).json({
      error: false,
      success: true,
      data: "User created successfully",
    });
  }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      success: false,
      data: "Something wen't wrong. Please try again",
    });
  }
};

const LoginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const isvalidEmail = validateEmail(email);
  const isValidPassword = validatePassword(password);

  //if email is invalid then return
  if (!isvalidEmail) {
    return res.status(422).json({
      error: true,
      success: false,
      data: "Invalid email format",
    });
  }

  //if password is invalid then return
  if (!isValidPassword) {
    return res.status(422).json({
      error: true,
      success: false,
      data: "Invalid Password format",
    });
  }

  try {
    // find the user with the email
    const user = await User.findOne({ email });

    //if user is not found
    if (!user) {
      return res.status(404).json({
        error: true,
        success: false,
        data: "User is not registered",
      });
    }
    const validatePassword = await bcryptjs.compare(password, user.password);

    //if password is not valid
    if (!validatePassword) {
      return res.status(401).json({
        error: true,
        success: false,
        data: "wrong password Entered",
      });
    }
    console.log(user._id.toString(), "ss");
    //create an accesstoken
    const accessToken = jwt.sign(
      { jwt: user._id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    //create a refreshToken
    const refreshToken = jwt.sign(
      { jwt: user._id.toString() },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    //send the refresh token as a secure cookie

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      error: false,
      success: true,
      data: "Login Successful",
      accessToken: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: true,
      success: false,
      data: "Something wen't wrong. Please try again",
    });
  }
};

export { RegisterUser, LoginUser };
