import { Typography } from "@mui/material";
import React, { useState } from "react";
import "./contact-styles.scss";
import CustomInput from "../../components/input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import contactCopy from "./contact.copy";
import { ITemplateParams } from "../../types/common-types";
import { sendEmail } from "../../utils/sendEmail";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-constants";
import { toast } from "react-toastify";
import { emailRegex, phoneRegex } from "../../constants/common-constants";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const navigateTo = useNavigate();

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !senderName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !subject.trim() ||
      !message.trim()
    ) {
      toast.error(contactCopy.errorMessage);
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error(contactCopy.emailValidationMessage);
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error(contactCopy.phoneValidationMessage);
      return;
    }

    setLoading(true);

    try {
      const templateParams: ITemplateParams = {
        senderName,
        subject,
        email,
        message,
        phone,
      };

      const flag = await sendEmail(templateParams);

      if (flag) {
        toast.success(contactCopy.successMessage);
        navigateTo(ROUTES.HOME);
      } else {
        toast.error(contactCopy.failureMessage);
      }

      setSenderName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact__container">
      <div className="contact__header">
        <Typography variant="h3" className="contact__title">
          {contactCopy.title}
        </Typography>
      </div>

      <form onSubmit={handleMessage} className="contact__form">
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setSenderName(e.target.value)}
            value={senderName}
            label={contactCopy.name}
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setEmail(e.target.value)}
            value={email}
            label={contactCopy.email}
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setPhone(e.target.value)}
            value={phone}
            label={contactCopy.phone}
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setSubject(e.target.value)}
            value={subject}
            label={contactCopy.subject}
          />
        </div>
        <div className="contact__input-group">
          <CustomInput
            handleChange={(e) => setMessage(e.target.value)}
            value={message}
            label={contactCopy.message}
            isMultiline
          />
        </div>
        <div className="contact__submit-button">
          <CustomButton
            title={
              loading ? contactCopy.loadingButtonText : contactCopy.buttonText
            }
            className="contact__button"
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Contact;
