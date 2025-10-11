import React, { useState } from "react";
import "./createAuction-styles.scss";
import { InputLabel, TextField, Typography } from "@mui/material";
import createAuctionCopy from "./createAuction.copy";
import CustomInput from "../../components/input/CustomInput";
import { InputPresets, InputVariant } from "../../constants/input-constants";
import CustomDropdown from "../../components/dropdown/CustomDropdown";
import DatePicker from "react-datepicker";
import CustomButton from "../../components/button/CustomButton";
import { useAppDispatch } from "../../hooks/storeHooks";
import FileUploadPreview from "../../assets/FileUploadPreview.jpg";
import { createAuction } from "../../store/slices/auctionSlice";
import { CATEGORY, CONDITION } from "../../constants/common-constants";

const CreateAuction = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string | null>("");
  const [condition, setCondition] = useState<string | null>("");
  const [startBid, setStartBid] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState<File | null>();

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

  const handleCreateAuction = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", String(category));
    formData.append("condition", String(condition));
    formData.append("startingBid", startBid);
    formData.append("description", description);
    formData.append("startTime", String(startDate));
    formData.append("endTime", String(endDate));
    if (image) {
      formData.append("image", image);
    }
    dispatch(createAuction(formData));
  };

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
            data={CATEGORY}
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
          isMultiline={true}
        />
        <div className="createAuction__bodysubcontainer">
          <div>
            <InputLabel shrink htmlFor="start-time-picker">
              Auction Starting Time
            </InputLabel>
            <DatePicker
              id="start-time-picker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              customInput={<TextField variant="standard" fullWidth />}
            />
          </div>
          <div>
            <InputLabel shrink htmlFor="end-time-picker">
              Auction End Time
            </InputLabel>

            <DatePicker
              id="end-time-picker"
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              showTimeSelect
              customInput={<TextField variant="standard" fullWidth />}
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
            <Typography>SVG, PNG, JPG or GIF (MAX: 800x400px)</Typography>
          </div>
          <CustomButton
            title={createAuctionCopy.createAuction}
            handleClick={handleCreateAuction}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateAuction;
