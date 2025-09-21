import type { ReactNode, SyntheticEvent } from 'react';

import { InputIconPosition, InputPresets, InputSizes, InputVariant } from '../constants/input-constants.ts';

export interface IInputProps {
  /** autoComplete: is an optional prop to on / off suggestion tooltip the input field */
  autoComplete?: string;
  /** containerClass: is an optional prop which contains the class name for styling the container */
  containerClass?: string;
  /** currencyErrorMessage: is an optional prop and it dictates the currency error message */
  currencyErrorMessage?: string;
  /** currencyLabelClass: is an optional prop which contains the class name for styling the currency label */
  currencyLabelClass?: string;
  /** currencyInputContainer: is an optional prop which contains the class name for styling the currency container */
  currencyInputContainer?: string;
  /** disabled: Optional. A boolean indicating if uploaded is disabled */
  disabled?: boolean;
  /** errorMessage: is an optional prop and it dictates the error message */
  errorMessage?: string;
  /** handleChange: is a required prop and it handles the change of text in input field */
  handleChange: (value: any) => void;
  /** handleCountryCodeChange:*/
  handleCountryCodeChange?: (event: SyntheticEvent<Element, Event>, value: any) => void;
  /** hasBorder: is an optional prop and it dictates whether input border will appear or not */
  hasBorder?: boolean;
  /** icon: is an optional prop and it dictates the name of the icon */
  icon?: ReactNode;
  /** iconPosition: is an optional prop and it dictates the position of the icon */
  iconPosition?: InputIconPosition;
  /** inputFieldClass: is an optional prop and it dictates the classes for input field */
  inputFieldClass?: string;
  /** inputFieldWithBorderClass: is an optional prop and it dictates the classes for input field */
  inputFieldWithBorderClass?: string;
  /** inputLabelClass: is an optional prop and it dictates the class of the input label */
  inputLabelClass?: string;
  /** inputLabelWithBorderClass: is an optional prop and it dictates the class of the input label */
  inputLabelWithBorderClass?: string;
  /** isError: is an optional prop and it dictates whether the input field is in error state or not*/
  isError?: boolean;
  /** isErrorBorder: is an optional prop and it dictates whether to show border on all sides of input field when error occurs */
  isErrorBorder?: boolean;
  /** isCountryCodeRequired : is an optional prop and it dictates whether the country code is shown or not  */
  isCountryCodeRequired?: boolean;
  /** isCurrencyRequired : is an optional prop and it dictates whether the currency string is shown or not  */
  isCurrencyRequired?: boolean;
  /** isFullWidth: is an optional prop and it whether input field takes full width  */
  isFullWidth?: boolean;
  /** isLabelError: is an optional prop and it dictates whether to show label error or not */
  isLabelError?: boolean;
  /** isMultiline: is an optional prop and it dictates whether input field is multiline or not. */
  isMultiline?: boolean;
  /** variant is an optional prop that indicates whether the input field is optional, and if so, it adds "optional" to the label. */
  isOptional?: boolean;
  /** isRequired: is an optional prop and it dictates whether the input field is required */
  isRequired?: boolean;
  /** label: is an optional prop and  it dictates the label of the input field */
  label?: string;
  /** maxInputLength: is an optional prop and  it dictates max no of characters that can be accepted by input field */
  maxInputLength?: number;
  /** placeholder: is an optional prop and  it dictates the placeholder text */
  placeholder?: string;
  /** preset: is an optional prop and it dictates the input preset  */
  preset?: InputPresets;
  /** size: is an optional prop and it dictates the size of the input field */
  size?: InputSizes;
  /** value: is an optional prop and it dictates the value of the input field */
  value?: string;
  /** variant: is an optional prop and it dictates the variant of the input field */
  variant?: InputVariant;
}
