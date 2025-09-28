import { Typography } from "@mui/material";
import React, { useState } from "react";
import "./contact-styles.scss";
import CustomInput from "../../components/input/CustomInput";
import CustomButton from "../../components/button/CustomButton";
import contactCopy from "./contact.copy";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setSenderName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="contact__container">
      <div className="contact__header">
        <Typography className="contact__title">{contactCopy.title}</Typography>
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
            title={contactCopy.buttonText}
            className="contact__button"
          />
        </div>
      </form>
    </div>
  );
};

export default Contact;
