import React from 'react';

import { VariantTypes } from '../../constants/common-constants';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  TextField,
  Typography,
} from '@mui/material';

import './customDropdown-styles.scss';

interface IDropdownProps {
  /** containerClass: is an optional prop which contains the class name for styling the container */
  containerClass?: string;
  /** data: is a required prop that contains the options for the dropdown */
  data: string[];
  /**hasError: is an optional prop that tells whether error is present or not */
  hasError?: boolean;
  /**isReadOnly is an optional prop that decides whether the input field is editable or not */
  isReadOnly?: boolean;
  /**isRequired is an optional prop that decides whether the input field is required or not */
  isRequired?: boolean;
  /**label: is a optional prop and acts as the input field label */
  label?: string;
  /**placeholder: is a required prop and acts as a placeholder for dropdown input field */
  placeholder: string;
  /**setValue: is an required prop that signifies the setter function for setting the value of the input field */
  setValue: (value: string | null) => void;
  /**value: is an optional prop and acts as the input field value */
  value?: string | null;
}

const CustomDropdown = (props: IDropdownProps) => {
  const {
    containerClass = '',
    data,
    hasError = false,
    isReadOnly = false,
    isRequired = false,
    label = '',
    placeholder,
    setValue,
    value = '',
  } = props;

  const errorClass = hasError ? 'dropdown__errorField' : '';

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <>
      <TextField
        {...params}
        inputProps={{
          ...params.inputProps,
          placeholder,
        }}
        variant={VariantTypes.Outlined}
        className={`dropdown__textfield ${errorClass}`}
      />
      {hasError && (
        <Typography className="dropdown__errorText">
          Invalid Input
        </Typography>
      )}
    </>
  );

  const handleChange = (_: any, newValue: string | null) => {
    setValue(newValue);
  };

  const handleInputChange = (_: any, newInputValue: string) => {
    setValue(newInputValue);
  };

  const renderOption = (props: React.HTMLAttributes<HTMLLIElement>, option: string) => {
    return (
      <Box component="li" {...props} className="dropdown__optionContainer" key={option}>
        <Typography className="dropdown__optionLabel">{option}</Typography>
      </Box>
    );
  };

  return (
    <div className={`dropdown__container ${containerClass}`}>
      <Typography className="dropdown__label">
        {label} {isRequired && <span> *</span>}
      </Typography>
      <Autocomplete
        autoComplete
        autoHighlight
        className="dropdown__addressDropdown"
        clearIcon={null}
        onChange={handleChange}
        onInputChange={handleInputChange}
        options={data}
        popupIcon={<ArrowDropDownIcon />}
        readOnly={isReadOnly}
        renderInput={renderInput}
        renderOption={renderOption}
        value={value}
        freeSolo // If `true`, the Autocomplete is free solo, meaning that the user input is not bound to provided options.
      />
    </div>
  );
};

export default CustomDropdown;
