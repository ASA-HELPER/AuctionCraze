import React, { useState } from "react";
import "./register-styles.scss";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import { UserRole } from "../../types/api-types";
import { Typography } from "@mui/material";
import { register } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../hooks/storeHooks";
import CustomDropdown from "../../components/dropdown/CustomDropdown";
import { BANKNAMES, ROLES } from "../../constants/common-constants";
import registerCopy from "./register.copy";
import CustomButton from "../../components/button/CustomButton";

const Register = () => {
  const dispatch = useAppDispatch();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [role, setRole] = useState<UserRole>();
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [bankAccountName, setBankAccountName] = useState<string>("");
  const [bankName, setBankName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const profileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImage(file);
    };
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLFormElement | HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleRegister = () => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    formData.append("bankAccountNumber", bankAccountNumber);
    formData.append("bankAccountName", bankAccountName);
    formData.append("bankName", bankName);
    formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
    formData.append("paypalEmail", paypalEmail);
    dispatch(register(formData));
  };

  return (
    <div className="register__container">
      <Typography className="register__title">Register</Typography>
      <div className="register__subcontainer">
        <div className="register__imageContainer">
          <div className="register__imageSubcontainer">
            <Typography className="register__imgLabels">
              Profile Image
            </Typography>
            <img
              src={profileImage ? profileImage : "/avatarHolder.jpg"}
              alt="avatar"
              className="register__image"
            />
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                className="avatar-update-btn"
              />
            </div>
          </div>
        </div>
        <CustomInput
          value={userName}
          handleChange={(e) => setUserName(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.userName}
          inputLabelClass="register__inputLabels"
        />
        <CustomInput
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
          preset={InputPresets.Email}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.email}
          inputLabelClass="register__inputLabels"
        />
        <CustomInput
          value={password}
          handleChange={(e) => setPasswrod(e.target.value)}
          preset={InputPresets.Password}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.password}
          inputLabelClass="register__inputLabels"
        />
        <CustomDropdown
          data={ROLES}
          placeholder={"Select Role"}
          setValue={(value) => setRole(value)}
          value={role}
          label={registerCopy.role}
        />
        <CustomInput
          value={phone}
          handleChange={(e) => setPhone(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.phone}
          inputLabelClass="register__inputLabels"
        />
        <CustomInput
          value={address}
          handleChange={(e) => setAddress(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.address}
          inputLabelClass="register__inputLabels"
        />
        <CustomInput
          value={bankAccountNumber}
          handleChange={(e) => setBankAccountNumber(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.bankAccountNumber}
          inputLabelClass="register__inputLabels"
        />
        <CustomDropdown
          data={BANKNAMES}
          placeholder={"Select project tech stack"}
          setValue={(value) => setBankAccountName(value)}
          value={bankAccountName}
          label={registerCopy.bankName}
        />
        <CustomInput
          value={easypaisaAccountNumber}
          handleChange={(e) => setEasypaisaAccountNumber(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.easyPaisaAccountNumber}
          inputLabelClass="register__inputLabels"
        />
        <CustomInput
          value={paypalEmail}
          handleChange={(e) => setPaypalEmail(e.target.value)}
          preset={InputPresets.Email}
          variant={InputVariant.Outlined}
          hasBorder
          label={registerCopy.paypalEmail}
          inputLabelClass="register__inputLabels"
        />
        <CustomButton handleClick={handleRegister} title="Register" />
      </div>
    </div>
  );
};

export default Register;
