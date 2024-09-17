import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  client: {},
  runtimeEnv: {
    MICRO_CMS_API_KEY: process.env.MICRO_CMS_API_KEY,
    MICRO_CMS_SERVICE_DOMAIN: process.env.MICRO_CMS_SERVICE_DOMAIN,
  },
  server: {
    MICRO_CMS_API_KEY: z.string().min(1),
    MICRO_CMS_SERVICE_DOMAIN: z.string().min(1),
  },
});

export default env;
