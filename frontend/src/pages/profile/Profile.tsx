import { useEffect } from "react";
import "./profile-styles.scss";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import { Typography } from "@mui/material";
import { ROLES } from "../../constants/common-constants";
import profileCopy from "./profile.copy";
import AvatarPreview from "../../assets/AvatarPreview.png";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/route-constants";

const Profile = () => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.user
  );

  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo(ROUTES.HOME);
    }
  }, [isAuthenticated]);

  return (
    <div className="profile__container">
      <Typography variant="h3" className="profile__title">Profile</Typography>
      <div className="profile__subcontainer">
        <div className="profile__imageContainer">
          <div className="profile__imageSubcontainer">
            <Typography className="profile__imgLabels">
              Profile Image
            </Typography>
            <img
              src={
                user && user.profileImage
                  ? user.profileImage.url
                  : AvatarPreview
              }
              alt="avatar"
              className="profile__image"
            />
          </div>
        </div>
        <CustomInput
          value={user && user.userName}
          handleChange={() => {}}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.userName}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        <CustomInput
          value={user && user.email}
          handleChange={() => {}}
          preset={InputPresets.Email}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.email}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        <CustomInput
          value={user && user.password}
          handleChange={() => {}}
          preset={InputPresets.Password}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.password}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        <CustomInput
          value={user && user.role}
          handleChange={() => {}}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.role}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        <CustomInput
          value={user && user.phone}
          handleChange={() => {}}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.phone}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        <CustomInput
          value={user && user.address}
          handleChange={() => {}}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          hasBorder
          label={profileCopy.address}
          inputLabelClass="profile__inputLabels"
          disabled
        />
        {user && user.role === ROLES[0] && (
          <>
            <CustomInput
              value={user && user.bankName}
              handleChange={() => {}}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label={profileCopy.selectBankName}
              inputLabelClass="profile__inputLabels"
              disabled
            />
            <CustomInput
              value={user && user.bankAccountNumber}
              handleChange={() => {}}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label={profileCopy.bankAccountNumber}
              inputLabelClass="profile__inputLabels"
              disabled
            />
            <CustomInput
              value={user && user.bankAccountUserName}
              handleChange={() => {}}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label={profileCopy.bankAccountUserName}
              inputLabelClass="profile__inputLabels"
              disabled
            />
            <CustomInput
              value={user && user.easypaisaAccountNumber}
              handleChange={() => {}}
              preset={InputPresets.Text}
              variant={InputVariant.Outlined}
              hasBorder
              label={profileCopy.easyPaisaAccountNumber}
              inputLabelClass="profile__inputLabels"
              disabled
            />
            <CustomInput
              value={user && user.paypalEmail}
              handleChange={() => {}}
              preset={InputPresets.Email}
              variant={InputVariant.Outlined}
              hasBorder
              label={profileCopy.paypalEmail}
              inputLabelClass="profile__inputLabels"
              disabled
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
