"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { Goldman } from "next/font/google";
import { useRouter } from "next-nprogress-bar";
import { useEffect, useMemo } from "react";
import { Form, useForm, useWatch } from "react-hook-form";
import { useShallow } from "zustand/shallow";
import styles from "./style.module.css";
import useContactStore, { Values, schema } from "@/stores/useContactStore";

const goldman = Goldman({ subsets: ["latin"], weight: ["700"] });

export default function Confirm(): JSX.Element {
  const { control, getValues, register, reset, watch } = useForm<Values>({
    defaultValues: {
      attribute: "individual",
      companyName: "",
      emailAddress: "",
      inquiryDetails: "",
      inquiryItem: "consultation",
      name: "",
      telephoneNumber: "",
    },
    progressive: true,
    resolver: zodResolver(schema),
  });
  const { values } = useContactStore(
    useShallow((state) => ({
      values: state.values,
    }))
  );
  const router = useRouter();
  const attribute = useWatch({ control, name: "attribute" });
  const inquiryItem = useWatch({ control, name: "inquiryItem" });
  const attributeText = useMemo(() => {
    switch (attribute) {
      case "individual": {
        return "個人";
      }
      case "corporation": {
        return "法人";
      }
    }
  }, [attribute]);
  const inquiryItemText = useMemo(() => {
    switch (inquiryItem) {
      case "consultation": {
        return "企業様案件のご相談に関して";
      }
      case "audition": {
        return "オーディションに関して";
      }
      case "recruitment": {
        return "スタッフ採用に関して(FAQをご確認下さい)";
      }
      case "sale": {
        return "グッズ販売に関して";
      }
      case "others": {
        return "その他";
      }
    }
  }, [inquiryItem]);

  useEffect(() => {
    if (!values) {
      router.push("/contact");

      return;
    }

    reset(values);
  }, [reset, router, values]);

  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={styles.wrapper}
      initial={{ opacity: 0, y: 48 }}
      transition={{
        delay: 0.5,
        duration: 0.5,
        ease: backOut,
      }}
    >
      <div className={styles.h1Wrapper}>
        <h1 className={`${goldman.className} ${styles.h1}`}>CONFIRM</h1>
      </div>
      <div className={styles.container}>
        <Form
          action="/api/email"
          control={control}
          onSuccess={() => router.push("/contact/thank-you")}
        >
          <div className={styles.fieldWrapper}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="attribute">
                属性
              </label>
              <div className={styles.value}>{attributeText}</div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="companyName">
                会社名
              </label>
              <div className={styles.value}>{watch("companyName") || "-"}</div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                お名前
              </label>
              <div className={styles.value}>{watch("name")}</div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="telephoneNumber">
                電話番号
              </label>
              <div className={styles.value}>
                {watch("telephoneNumber") || "-"}
              </div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="emailAddress">
                メールアドレス
              </label>
              <div className={styles.value}>{watch("emailAddress")}</div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="inquiryItem">
                お問い合わせ項目
              </label>
              <div className={styles.value}>{inquiryItemText}</div>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="inquiryDetails">
                お問い合わせ内容
              </label>
              <div className={styles.value}>{watch("inquiryDetails")}</div>
            </div>
          </div>
          <div className={styles.formFooter}>
            <p>
              記入内容をご確認のうえ、問題がなければ「送信する」ボタンを押してください。
            </p>
            <div className={styles.buttonsWrapper}>
              <button
                className={styles.button}
                onClick={() => router.push("/contact")}
                type="button"
              >
                修正する
              </button>
              <button className={styles.button} type="submit">
                送信する
              </button>
            </div>
          </div>
          <input {...register("attribute")} type="hidden" />
          <input {...register("companyName")} type="hidden" />
          <input {...register("emailAddress")} type="hidden" />
          <input {...register("inquiryDetails")} type="hidden" />
          <input {...register("inquiryItem")} type="hidden" />
          <input {...register("name")} type="hidden" />
          <input {...register("telephoneNumber")} type="hidden" />
        </Form>
      </div>
    </motion.div>
  );
}
