import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  client: {},
  runtimeEnv: {
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
    NODEMAILER_AUTH_CLIENT_ID: process.env.NODEMAILER_AUTH_CLIENT_ID,
    NODEMAILER_AUTH_CLIENT_SECRET: process.env.NODEMAILER_AUTH_CLIENT_SECRET,
    NODEMAILER_AUTH_REFRESH_TOKEN: process.env.NODEMAILER_AUTH_REFRESH_TOKEN,
    NODEMAILER_AUTH_USER: process.env.NODEMAILER_AUTH_USER,
    NODEMAILER_TO: process.env.NODEMAILER_TO,
  },
  server: {
    MICRO_CMS_API_KEY: z.string().min(1),
    MICRO_CMS_SERVICE_DOMAIN: z.string().min(1),
    NODEMAILER_AUTH_CLIENT_ID: z.string().min(1),
    NODEMAILER_AUTH_CLIENT_SECRET: z.string().min(1),
    NODEMAILER_AUTH_REFRESH_TOKEN: z.string().min(1),
    NODEMAILER_AUTH_USER: z.string().email(),
    NODEMAILER_TO: z.string().email(),
  },
});

export default env;
