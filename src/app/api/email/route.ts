"use server";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import env from "@/env";

// eslint-disable-next-line import/prefer-default-export
export async function POST(request: NextRequest): Promise<NextResponse> {
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
  const data = await request.formData();
  const attribute = data.get("attribute") as string;
  const companyName = data.get("companyName") as string;
  const emailAddress = data.get("emailAddress") as string;
  const inquiryDetails = data.get("inquiryDetails") as string;
  const inquiryItem = data.get("inquiryItem") as string;
  const name = data.get("name") as string;
  const telephoneNumber = data.get("telephoneNumber") as string;

  let attributeText = "";

  switch (attribute) {
    case "individual": {
      attributeText = "個人";

      break;
    }
    case "corporation": {
      attributeText = "法人";

      break;
    }
  }

  let inquiryItemText = "";

  switch (inquiryItem) {
    case "consultation": {
      inquiryItemText = "企業様案件のご相談に関して";

      break;
    }
    case "audition": {
      inquiryItemText = "オーディションに関して";

      break;
    }
    case "recruitment": {
      inquiryItemText = "スタッフ採用に関して(FAQをご確認下さい)";

      break;
    }
    case "sale": {
      inquiryItemText = "グッズ販売に関して";

      break;
    }
    case "others": {
      inquiryItemText = "その他";

      break;
    }
  }

  await transporter.sendMail({
    from: emailAddress,
    subject: "メール送信確認テスト",
    text: `属性：${attributeText}
会社名：${companyName || "-"}
お名前：${name}
電話番号：${telephoneNumber || "-"}
メールアドレス：${emailAddress}
お問い合わせ項目：${inquiryItemText}
お問い合わせ内容：
${inquiryDetails}
`,
    to: env.NODEMAILER_TO,
  });

  return NextResponse.json({}, { status: 200 });
}
