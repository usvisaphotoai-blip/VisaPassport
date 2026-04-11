import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Must provide name, email, and password" },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    // Handle case where user exists but might only be registered via OAuth
    if (existingUser) {
      if (existingUser.password) {
        return NextResponse.json(
          { error: "A user with this email already exists." },
          { status: 400 }
        );
      } else {
        // Option to link account: User previously logged in with Google, now setting a password
        const hashedPassword = await bcrypt.hash(password, 10);
        existingUser.password = hashedPassword;
        existingUser.name = name; 
        await existingUser.save();
        return NextResponse.json({ message: "Account updated successfully" });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to register", details: error.message },
      { status: 500 }
    );
  }
}
