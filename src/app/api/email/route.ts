import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  auth: {
    pass: "jn7jnAPss4f63QBp6D",
    user: "maddison53@ethereal.email",
  },
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
});

// eslint-disable-next-line import/prefer-default-export
export async function POST(_: NextRequest): Promise<NextResponse> {
  await transporter.sendMail({
    from: "hoge",
    subject: "Hello ✔",
    text: "Hello world?",
    to: "bar@example.com, baz@example.com",
  });

  return NextResponse.json({}, { status: 200 });
}
