import { CircularProgress } from '@mui/material';

import './customSpinner-styles.scss';

interface ISpinnerProps {
  /**image: is an optional prop that denotes the image to displayed inside the spinner */
  image?: any;
  /**color: is an optional prop that denotes the color to the spinner */
  color?: string;
  /** spinnerSize: is an optional prop that denotes the size of the spinner */
  spinnerSize?: number;
}

const CustomSpinner = (props: ISpinnerProps) => {
  const { image = null, color = 'black', spinnerSize = 75 } = props;
  return (
    <div className="spinner__container">
      {image && <div className="spinner__imageContainer">{image}</div>}
      <CircularProgress
        size={spinnerSize}
        thickness={1.5}
        className="spinner__circularProgress"
        style={{
          color: color,
        }}
      />
    </div>
  );
};

export default CustomSpinner;
