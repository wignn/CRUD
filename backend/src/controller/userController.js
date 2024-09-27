import { prisma } from "../config/db.js";
import bcrypt from "bcrypt";
import { z } from "zod";
import { respone } from "../utils/response.js";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";
import ('dotenv/config')

const userSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});

export const getAllUsers = async (req, res) => {
  try {
    const result = await prisma.user.findMany();
    respone(200, result, res);
  } catch (error) {
    respone(500, "An error occurred while fetching users.", res);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await prisma.user.findUnique({
      where: {
        id: parseInt(id, 10),
      },
      include: {
        profile: true,
      },
    });
    respone(200, result, res);
  } catch (error) {
    console.log(error);
    respone(500, "internal server", res);
  }
};

export const getUserByName = async (req, res) => {
  try {
    const { name } = req.params;

    const result = await prisma.user.findUnique({
      where: {
        name: name,
      },
    });
    respone(200, result, res);
  } catch (error) {
    respone(500, "An error occurred while fetching user", res);
  }
};
export const createUser = async (req, res) => {
  try {
    const validation = userSchema.safeParse(req.body);
    if (!validation.success) {
      return res.status(400).json({
        error: "Validation failed",
        details: validation.error.errors,
      });
    }
    const { name, email, password } = validation.data;
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    const profile = await prisma.profile.create({
      data: {
        userId: user.id,
        avatar: "11233.png",
        bio: null,
        sampul: "about.jpg",
      },
    });

    return res.status(200).json({ user, profile });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const reset = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email)

    const result = await prisma.user.findUnique({
      where: { email },
    });
    if (result) {
      const token = nanoid(32);
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });

      const htmlBody = `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9;">
    <h2 style="color: #333;">Password Reset Request</h2>
    <p>We received a request to reset your password. Click the button below to reset it.</p>
    <a href="http://localhost:3000/reset/${token}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px;">Reset Your Password</a>
    <p>If you did not request a password reset, please ignore this email.</p>
    <p style="color: #888;">Thank you,<br/>Othinus</p>
  </div>

`;
      const info = await transporter.sendMail({
        from: process.env.FROM,
        to: email,
        subject: "Password Reset Request",
        text: "Click the link to reset your password.",
        html: htmlBody,
      });

      console.log("Message sent: %s", info.messageId);

      await prisma.user.update({
        where: { email },
      data:{
        verifyToken: token,
        tokenCreatedAt: new Date(Date.now() + 5 * 60 * 1000),
      }
      })
    }
    respone(200, result, res)
  } catch (err) {
    console.log(err);
    respone(500, "internal server", res);
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    console.log(token + newPassword);

    const result = await prisma.user.findFirst({
      where: {
        verifyToken: token 
      }
    });

    if (!result) throw new Error("token invalid");

    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(newPassword, salt);
    const now = new Date();

    if (result.tokenCreatedAt <= now) {
      await prisma.user.update({
        where: {
          id: result.id
        },
        data: {
          tokenCreatedAt: null,
          verifyToken: null
        }
      });
    }
    await prisma.user.update({
      where: {
        id: result.id
      },
      data: {
        password: passwordHashed,
        verifyToken: null,
        tokenCreatedAt: null
      }
    });

    respone(200, result, res);
  } catch (err) {
    console.log(err);
    respone(500, "internal server error", res);
  }
};
