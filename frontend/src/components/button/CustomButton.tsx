import React from 'react';

import { Button, ButtonProps } from '@mui/material';

import './customButton-styles.scss';
import { ButtonVariant } from '../../constants/common-constants';
import CustomSpinner from '../../components/spinner/CustomSpinner';

interface IButtonProps extends ButtonProps {
  /** buttonClass: is an optional prop that provides a class to button for styling */
  buttonClass?: string;
  /** buttonVariant: is an optional prop that states variant of the button */
  buttonVariant?: ButtonVariant;
  /** disableFocusRipple: is an optional prop that states whether button focus ripple effect is disabled or not */
  disableFocusRipple?: boolean;
  /** endIcon: is an optional prop that dictates an icon to end of the button */
  endIcon?: React.ReactNode;
  /** handleClick: is a required prop that handles the action on button click */
  handleClick?: (event?: React.MouseEvent<HTMLElement>) => void;
  /** disabled: is an optional prop that states whether button is disabled or not */
  disabled?: boolean;
  /** disabledRipple: is an optional prop that states whether button ripple effect is disabled or not */
  disabledRipple?: boolean;
  /** fullWidth: is an optional prop to provide full width to the button */
  fullWidth?: boolean;
  /** loading: is an optional prop to show loading state of the button */
  loading?: boolean;
  /** loadingIndicatorClass: is an optional prop that provides a class to loading indicator for styling */
  loadingIndicatorClass?: string;
  /** startIcon: is an optional prop that dictates an icon to end of the button */
  startIcon?: React.ReactNode;
  /** title: is a required prop that states the button title */
  title?: string;
  /** titleClass: is an optional prop that provides a class to button's title for styling */
  titleClass?: string;
}

const CustomButton = (props: IButtonProps) => {
  const {
    buttonClass = '',
    buttonVariant = ButtonVariant.Contained,
    handleClick,
    disabled = false,
    fullWidth = true,
    loading = false,
    loadingIndicatorClass,
    disabledRipple = false,
    disableFocusRipple = false,
    title,
    titleClass = '',
    endIcon,
    ...rest
  } = props;

  return (
    <Button
      className={`customButton__container  ${buttonClass}`}
      classes={{
        endIcon: 'customButton__endIcon',
        startIcon: 'customButton__startIcon',
      }}
      disabled={disabled}
      disableFocusRipple={disableFocusRipple}
      disableRipple={disabledRipple}
      fullWidth={fullWidth}
      onClick={handleClick}
      variant={buttonVariant}
      color="primary"
      endIcon={endIcon}
      {...rest}>
      {loading ? (
        <CustomSpinner spinnerSize={15} color="white" />
      ) : (
        title
      )}
    </Button>
  );
};

export default CustomButton;
