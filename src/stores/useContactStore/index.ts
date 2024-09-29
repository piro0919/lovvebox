import validator from "validator";
import { z } from "zod";
import { create } from "zustand";

export const schema = z.object({
  attribute: z.string().min(1),
  companyName: z.string(),
  emailAddress: z.string().email(),
  inquiryDetails: z.string().min(1),
  inquiryItem: z.string().min(1),
  name: z.string().min(1),
  telephoneNumber: z.union([
    z.literal(""),
    z.string().refine(validator.isMobilePhone),
  ]),
});

export type Values = z.infer<typeof schema>;

type ContactStore = {
  clearValues: () => void;
  setValues: (values: Values) => void;
  values?: Values;
};

const useContactStore = create<ContactStore>()((set) => ({
  clearValues: (): void => set(() => ({ values: undefined })),
  setValues: (values: Values): void => set(() => ({ values })),
  values: undefined,
}));

export default useContactStore;
