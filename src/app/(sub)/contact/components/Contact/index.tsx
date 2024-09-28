"use client";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import { backOut } from "eases";
import { motion } from "framer-motion";
import { Goldman } from "next/font/google";
import Link from "next/link";
import { Form, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import { useBoolean } from "usehooks-ts";
import validator from "validator";
import { z } from "zod";
import styles from "./style.module.css";

const goldman = Goldman({ subsets: ["latin"], weight: ["400", "700"] });
const schema = z.object({
  attribute: z.string().min(1),
  companyName: z.string(),
  emailAddress: z.string().email(),
  inquiryDetails: z.string().min(1),
  inquiryItem: z.string().min(1),
  name: z.string().min(1),
  telephoneNumber: z.string().refine(validator.isMobilePhone),
});

type FieldTypes = z.infer<typeof schema>;

export default function Contact(): JSX.Element {
  const {
    control,
    formState: { errors },
    register,
  } = useForm<FieldTypes>({
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
  const { setTrue: onIsAgree, value: isAgree } = useBoolean(false);

  console.log(errors);

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
        <h1 className={`${goldman.className} ${styles.h1}`}>CONTACT</h1>
      </div>
      <div className={styles.container}>
        <Form action="/api/email" control={control}>
          <div className={styles.fieldWrapper}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                属性<abbr>*</abbr>
              </legend>
              <div className={styles.radioFields}>
                <div className={styles.radioField}>
                  <input
                    {...register("attribute")}
                    id="individual"
                    type="radio"
                    value="individual"
                  />
                  <label className={styles.label} htmlFor="individual">
                    個人
                  </label>
                </div>
                <div className={styles.radioField}>
                  <input
                    {...register("attribute")}
                    id="corporation"
                    type="radio"
                    value="corporation"
                  />
                  <label className={styles.label} htmlFor="corporation">
                    法人
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="companyName">
                会社名
              </label>
              <input
                {...register("companyName")}
                className={styles.input}
                id="companyName"
                placeholder="株式会社◯◯"
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                お名前<abbr>*</abbr>
              </label>
              <input
                {...register("name")}
                className={styles.input}
                id="name"
                placeholder="◯◯"
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className={styles.errorMessage}>{message}</p>
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="telephoneNumber">
                電話番号
              </label>
              <input
                {...register("telephoneNumber")}
                className={styles.input}
                id="telephoneNumber"
                placeholder="08012345678"
              />
              <ErrorMessage
                errors={errors}
                name="telephoneNumber"
                render={({ message }) => (
                  <p className={styles.errorMessage}>{message}</p>
                )}
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="emailAddress">
                メールアドレス<abbr>*</abbr>
              </label>
              <input
                {...register("emailAddress")}
                className={styles.input}
                id="emailAddress"
                placeholder="sample@example.com"
              />
              <ErrorMessage
                errors={errors}
                name="emailAddress"
                render={({ message }) => (
                  <p className={styles.errorMessage}>{message}</p>
                )}
              />
            </div>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>
                お問い合わせ項目<abbr>*</abbr>
              </legend>
              <div>
                <div className={styles.radioField}>
                  <input
                    {...register("inquiryItem")}
                    id="consultation"
                    type="radio"
                    value="consultation"
                  />
                  <label className={styles.label} htmlFor="consultation">
                    企業様案件のご相談に関して
                  </label>
                </div>
                <div className={styles.radioField}>
                  <input
                    {...register("inquiryItem")}
                    id="audition"
                    type="radio"
                    value="audition"
                  />
                  <label className={styles.label} htmlFor="audition">
                    オーディションに関して
                  </label>
                </div>
                <div className={styles.radioField}>
                  <input
                    {...register("inquiryItem")}
                    id="recruitment"
                    type="radio"
                    value="recruitment"
                  />
                  <label className={styles.label} htmlFor="recruitment">
                    スタッフ採用に関して(FAQをご確認下さい)
                  </label>
                </div>
                <div className={styles.radioField}>
                  <input
                    {...register("inquiryItem")}
                    id="sale"
                    type="radio"
                    value="sale"
                  />
                  <label className={styles.label} htmlFor="sale">
                    グッズ販売に関して
                  </label>
                </div>
                <div className={styles.radioField}>
                  <input
                    {...register("inquiryItem")}
                    id="others"
                    type="radio"
                    value="others"
                  />
                  <label className={styles.label} htmlFor="others">
                    その他
                  </label>
                </div>
              </div>
            </fieldset>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="inquiryDetails">
                お問い合わせ内容<abbr>*</abbr>
              </label>
              <TextareaAutosize
                {...register("inquiryDetails")}
                className={styles.textarea}
                id="inquiryDetails"
                minRows={10}
                placeholder="お問い合わせ内容を詳細にご入力ください。"
              />
              <ErrorMessage
                errors={errors}
                name="inquiryDetails"
                render={({ message }) => (
                  <p className={styles.errorMessage}>{message}</p>
                )}
              />
            </div>
          </div>
          <div className={styles.formFooter}>
            <label className={styles.checkboxLabel}>
              <input disabled={!isAgree} type="checkbox" />
              <span>
                <Link
                  className={styles.link}
                  href="/privacy-policy"
                  onClick={() => onIsAgree()}
                  target="_blank"
                >
                  プライバシーポリシー
                </Link>
                に同意する。
              </span>
            </label>
            <button className={styles.button} type="submit">
              確認画面へ
            </button>
          </div>
        </Form>
      </div>
    </motion.div>
  );
}
