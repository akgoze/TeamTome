import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.post("/signup", async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).send("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    res.status(200).send("User Registered");
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

app.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});
