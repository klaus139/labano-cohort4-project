import express, { Request, Response, NextFunction } from "express";
import { APIError, STATUS_CODES } from "../utils/app-error";
import User from "../models/userModel";
import { userLoginSchema, userRegistrationSchema } from "../utils/validation";
import { GenerateSalt, GeneratePassword, ValidatePassword } from "../utils";
import { GenerateToken } from "../utils";
import jwt from "jsonwebtoken";

export const Register = async(req:Request, res:Response, next:NextFunction) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    const validate = userRegistrationSchema.validate(req.body);
    if (validate.error) {
      return res.status(400).json({ Error: validate.error.details[0].message });
    }

    //check for the user in the database
    const oldUser = await User.findOne({ email })
    if (oldUser) {
      return res.status(400).json({ message: "user already exists please login instead" });

    }
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const newUser = new User({
      firstname,
      lastname,
      email,
      salt,
      password:userPassword

    })

    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn:"1d"
            }
    )
    res.cookie("auth_token", token, {
      httpOnly:true,
      secure: process.env.NODE_ENV==="production",
      maxAge:86400000,
    })
    res.status(201).json({ message: "user created successfully", newUser, token });

  } catch (error:any) {
    return next(new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Error creating user", true, "", true));
  }
}

export const Login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    const validate = userLoginSchema.validate(req.body);
    if (validate.error) {
      return res.status(400).json({ Error: validate.error.details[0].message });
    }

    const user = await User.findOne({ email });

    if (user) {
      const validation = await ValidatePassword(password, user.password, user.salt);

      if (validation) {
        user.verified = true;

        const token = jwt.sign(
          { userId: user._id },
            process.env.JWT_SECRET as string,
            {
              expiresIn: "1d",
            }
        );

        // Set the 'auth_token' cookie
        res.cookie("auth_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          maxAge: 3600000, // 1 hour in milliseconds
        });

        return res.status(200).json({ user, token });
      } else {
        return res.status(401).json({ Error: "Incorrect password" });
      }
    } else {
      return res.status(404).json({ Error: "Admin not found" });
    }
  } catch (error) {
    return next(
      new APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Error Logging", true, "", true)
    );
  }
};

export const Logout = async(req:Request, res:Response, next:NextFunction) => {
  try {
    res.cookie("auth_token", "", {
      expires: new Date(0),
    })
    res.send();

  } catch (error) {

  }
}

export const GetUser = async(req:Request, res:Response) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message:"User not found" })
    }
    res.json(user);

  } catch (error) {

  }
}
