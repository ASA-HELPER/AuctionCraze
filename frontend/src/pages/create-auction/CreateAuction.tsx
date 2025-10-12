import React, { useEffect, useState } from "react";
import "./createAuction-styles.scss";
import { InputLabel, Typography } from "@mui/material";
import createAuctionCopy from "./createAuction.copy";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import CustomDropdown from "../../components/dropdown/CustomDropdown";
import DatePicker from "react-datepicker";
import CustomButton from "../../components/button/CustomButton";
import { useAppDispatch } from "../../hooks/storeHooks";
import FileUploadPreview from "../../assets/FileUploadPreview.jpg";
import { createAuction } from "../../store/slices/auctionSlice";
import {
  AUCTIONCATEGORIES,
  CONDITION,
  ROLES,
} from "../../constants/common-constants";
import { ROUTES } from "../../constants/route-constants";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const CreateAuction = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>("");
  const [condition, setCondition] = useState<string | null>("");
  const [startBid, setStartBid] = useState("");
  const [description, setDescription] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [image, setImage] = useState<File | null>();

  const { loading } = useSelector((state: RootState) => state.auction);

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );
  const navigateTo = useNavigate();

  const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImage(file);
      };
    }
  };

  const handleCreateAuction = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", String(category));
    formData.append("condition", String(condition));
    formData.append("startingBid", startBid);
    formData.append("description", description);
    formData.append("startTime", startTime ? startTime.toISOString() : "");
    formData.append("endTime", endTime ? endTime.toISOString() : "");

    if (image) {
      formData.append("image", image);
    }
    dispatch(createAuction(formData));
  };

  useEffect(() => {
    if (!isAuthenticated || user.role !== ROLES[0]) {
      navigateTo(ROUTES.HOME);
    }
  }, [isAuthenticated]);

  return (
    <div className="createAuction__container">
      <Typography variant="h2">{createAuctionCopy.createAuction}</Typography>
      <div className="createAuction__bodycontainer">
        <Typography variant="h6">{createAuctionCopy.auctionDetail}</Typography>
        <div className="createAuction__bodysubcontainer">
          <CustomInput
            value={title}
            handleChange={(e) => setTitle(e.target.value)}
            preset={InputPresets.Text}
            variant={InputVariant.Outlined}
            label={createAuctionCopy.title}
            hasBorder
            inputLabelClass="createAuction__inputLabels"
          />
          <CustomDropdown
            data={AUCTIONCATEGORIES}
            setValue={(value) => setCategory(value)}
            placeholder={createAuctionCopy.selectCategory}
            value={category}
            label={createAuctionCopy.category}
          />
        </div>
        <div className="createAuction__bodysubcontainer">
          <CustomDropdown
            data={CONDITION}
            setValue={(value) => setCondition(value)}
            placeholder={createAuctionCopy.selectCondition}
            value={condition}
            label={createAuctionCopy.condition}
          />
          <CustomInput
            value={startBid}
            handleChange={(e) => setStartBid(e.target.value)}
            preset={InputPresets.Text}
            variant={InputVariant.Outlined}
            label={createAuctionCopy.startBid}
            hasBorder
            inputLabelClass="createAuction__inputLabels"
          />
        </div>
        <CustomInput
          value={description}
          handleChange={(e) => setDescription(e.target.value)}
          preset={InputPresets.Text}
          variant={InputVariant.Outlined}
          label={createAuctionCopy.description}
          hasBorder
          inputLabelClass="createAuction__inputLabels"
          isMultiline
        />
        <div className="createAuction__bodysubcontainer">
          <div>
            <InputLabel shrink htmlFor="start-time-picker">
              {createAuctionCopy.auctionStartTime}
            </InputLabel>
            <DatePicker
              selected={startTime}
              onChange={(date) => setStartTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat={"MMMM d, yyyy h,mm aa"}
            />
          </div>
          <div>
            <InputLabel shrink htmlFor="end-time-picker">
              {createAuctionCopy.auctionEndTime}
            </InputLabel>
            <DatePicker
              selected={endTime}
              onChange={(date) => setEndTime(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat={"MMMM d, yyyy h,mm aa"}
            />
          </div>
        </div>
        <div>
          <Typography variant="h4">
            {createAuctionCopy.auctionItemImage}
          </Typography>
          <div className="createAuction__uploadcontainer">
            <img
              src={image ? URL.createObjectURL(image) : FileUploadPreview}
              alt="image"
              className="createAuction__image"
            />
            <input
              type="file"
              accept="image/svg+xml, image/png, image/jpeg, image/gif"
              onChange={imageHandler}
            />
            <Typography>{createAuctionCopy.clickUpload}</Typography>
            <Typography>{createAuctionCopy.imageFormat}</Typography>
          </div>
          <CustomButton
            title={
              loading
                ? createAuctionCopy.loadingButtonText
                : createAuctionCopy.buttonText
            }
            handleClick={handleCreateAuction}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
