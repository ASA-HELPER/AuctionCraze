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
import AvatarPreview from "../../assets/AvatarPreview.png";
import { ROUTES } from "../../constants/route-constants";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasswrod] = useState("");
  const [role, setRole] = useState<UserRole | null>(null);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string | null>("");
  const [bankAccountUserName, setBankAccountUserName] = useState("");
  const [easypaisaAccountNumber, setEasypaisaAccountNumber] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const profileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setProfileImage(file);
      };
    }
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("role", String(role));
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }
    if (role === ROLES[0]) {
      formData.append("bankAccountNumber", bankAccountNumber);
      formData.append("bankName", String(bankName));
      formData.append("bankAccountName", bankAccountUserName);
      formData.append("easypaisaAccountNumber", easypaisaAccountNumber);
      formData.append("paypalEmail", paypalEmail);
    }
    const isUserRegistered = await dispatch(register(formData));
    if (isUserRegistered) {
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <div className="register__container">
      <Typography className="register__title">
        {registerCopy.register}
      </Typography>
      <div className="register__subcontainer">
        <Typography className="register__imgLabels">
          {registerCopy.profileImage}
        </Typography>
        <div className="register__imageContainer">
          <div className="register__imageSubcontainer">
            <img
              src={
                profileImage ? URL.createObjectURL(profileImage) : AvatarPreview
              }
              alt="avatar"
              className="register__image"
            />
            <div className="relative">
              <input
                type="file"
                onChange={profileHandler}
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
          data={ROLES.slice(0, 2)}
          placeholder={registerCopy.selectRole}
          setValue={(value) => {
            if (value) {
              setRole(value as UserRole);
            } else {
              setRole(null);
            }
          }}
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
        {role == ROLES[0] && (
          <>
            <CustomDropdown
              data={BANKNAMES}
              placeholder={registerCopy.selectBankName}
              setValue={(value) => setBankName(value)}
              value={bankName}
              label={registerCopy.bankName}
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
            <CustomInput
              value={bankAccountUserName}
              handleChange={(e) => setBankAccountUserName(e.target.value)}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label={registerCopy.bankAccountUserName}
              inputLabelClass="register__inputLabels"
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
          </>
        )}
        <CustomButton
          handleClick={handleRegister}
          title={registerCopy.register}
          buttonClass="register__buttonStyle"
        />
      </div>
    </div>
  );
};

export default Register;
