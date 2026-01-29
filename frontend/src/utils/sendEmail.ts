import emailjs from "@emailjs/browser";
import { ITemplateParams } from "../types/common-types";

export const sendEmail = async (
  templateParams: ITemplateParams,
): Promise<boolean> => {
  try {
    await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_PUBLIC_KEY,
    );
    return true;
  } catch (err) {
    console.error("EmailJS Error:", err);
    return false;
  }
};
