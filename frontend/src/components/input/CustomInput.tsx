import React, { useState } from 'react';

import {
  InputAdornmentPosition,
  InputIconPosition,
  InputPresets,
  InputSizes,
  InputType,
  InputVariant,
} from '../../constants/input-constants.ts';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  InputProps,
  TextField,
  TextFieldProps,
} from '@mui/material';

import './customInput-styles.scss';
import { IInputProps } from '../../types/input-types.ts';

const CustomInput = (props: IInputProps) => {
  const {
    disabled = false,
    autoComplete = 'on',
    containerClass = '',
    errorMessage = 'Invalid Input',
    handleChange,
    hasBorder = false,
    icon,
    iconPosition,
    inputFieldClass = '',
    inputFieldWithBorderClass = '',
    inputLabelClass = '',
    inputLabelWithBorderClass = '',
    isError = false,
    isErrorBorder = true,
    isFullWidth = true,
    isLabelError = false,
    isMultiline = false,
    isOptional = false,
    isRequired,
    label,
    maxInputLength = 0,
    placeholder,
    preset = InputPresets.Text,
    size = InputSizes.Small,
    value = '',
    variant = InputVariant.Outlined,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const commonInputProps = {
    fullWidth: isFullWidth,
    placeholder: placeholder,
    required: isRequired,
    size: size,
    variant: variant,
  };
  const errorClass = isErrorBorder ? 'customInput__valueErrorWithBorder' : 'customInput__valueError';
  const inputContainerClass = `customInput__container ${containerClass} `;
  const textFieldClass = `customInput__field ${inputFieldClass} ${hasBorder ? `customInput__fieldWithBorder ${inputFieldWithBorderClass}` : ''} ${isError ? errorClass : ''}`;
  const labelClass = `customInput__label ${inputLabelClass} ${hasBorder ? `customInput__labelWithBorder ${inputLabelWithBorderClass}` : 'customInput__labelWithoutBorder'} ${isLabelError ? 'customInput__labelError' : ''}`;

  const handleShowPasswordClick = () => setShowPassword(show => !show);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    handleChange(event);
  };

  const getTextFieldComponent = (extraProps: Partial<TextFieldProps>) => {
    const errorText =
      isError && isErrorBorder ? errorMessage || 'Invalid Input' : '';

    const modifiedExtraProps = { ...extraProps };

    if (maxInputLength) {
      modifiedExtraProps.slotProps = {
        ...modifiedExtraProps.slotProps,
        htmlInput: {
          ...(extraProps.slotProps?.htmlInput || {}),
          maxLength: maxInputLength,
        },
      };
    }

    return (
      <TextField
        {...modifiedExtraProps}
        {...commonInputProps}
        disabled={disabled}
        autoComplete={autoComplete}
        className={textFieldClass}
        helperText={errorText}
        multiline={isMultiline}
        onChange={handleInputChange}
        value={value}
      />
    );
  };

  const renderComponent = () => {
    let component: React.JSX.Element;
    const inputProps: InputProps =
      variant === InputVariant.Outlined ? {} : { disableUnderline: true };
    const iconPositionProp =
      iconPosition === InputIconPosition.Left
        ? {
            startAdornment: (
              <InputAdornment position={InputAdornmentPosition.Start}>{icon}</InputAdornment>
            ),
          }
        : {
            endAdornment: (
              <InputAdornment position={InputAdornmentPosition.End}>{icon}</InputAdornment>
            ),
          };

    switch (preset) {
      case InputPresets.Text:
        component = getTextFieldComponent({ InputProps: inputProps });
        break;
      case InputPresets.Email:
        component = getTextFieldComponent({ InputProps: inputProps });
        break;
      case InputPresets.Password:
        inputProps.endAdornment = (
          <IconButton className="customInput__passwordIcon" onClick={handleShowPasswordClick}>
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        );
        component = getTextFieldComponent({
          InputProps: inputProps,
          type: showPassword ? InputType.Text : InputType.Password,
        });
        break;
      case InputPresets.Icon:
        component = getTextFieldComponent({
          InputProps: { ...inputProps, ...iconPositionProp },
        });
        break;
      default:
        component = <></>;
    }
    return component;
  };

  return (
    <Container className={inputContainerClass}>
      {!!label && (
        <div className={`customInput__labelContainer ${containerClass}`}>
          <InputLabel className={labelClass}>
            {label}
            {isOptional && (
              <span className="customInput__optionalLabel">{'Optional'}</span>
            )}
            {isRequired && <span> *</span>}
          </InputLabel>
        </div>
      )}
      <div className={'customInput__row'}>{renderComponent()}</div>
    </Container>
  );
};

export default React.memo(CustomInput);
