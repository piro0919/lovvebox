"use server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import env from "@/env";

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest): Promise<NextResponse> {
  const data = await request.formData();
  const emailAddress = data.get("emailAddress") as string;
  const transporter = nodemailer.createTransport({
    auth: {
      clientId: env.NODEMAILER_AUTH_CLIENT_ID,
      clientSecret: env.NODEMAILER_AUTH_CLIENT_SECRET,
      refreshToken: env.NODEMAILER_AUTH_REFRESH_TOKEN,
      type: "OAuth2",
      user: env.NODEMAILER_AUTH_USER,
    },
    service: "gmail",
  });

  await transporter.sendMail({
    from: emailAddress,
    subject: "メール送信確認テスト",
    text: "これはテストメールです",
    to: env.NODEMAILER_TO,
  });

  return NextResponse.json({}, { status: 200 });
}
