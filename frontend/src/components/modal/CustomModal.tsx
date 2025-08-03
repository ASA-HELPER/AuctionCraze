import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Fade, IconButton, Modal, ModalOwnProps, Typography } from '@mui/material';

import './customModal-styles.scss';

interface CustomModalProps extends ModalOwnProps {
  /** open: is an required prop for modal open/closed state */
  open: boolean;
  /** onClose: is an callback function triggered on modal close */
  onClose: () => void;
  /** renderHeader:is an  optional prop for custom modal header component */
  renderHeader?: () => React.JSX.Element;
  /** headerClassName: is an optional prop that provides a class to the modal header */
  headerClassName?: string;
  /** headerTitle: is an optional prop for header title */
  headerTitle?: string;
  /** headerTitleClassName: is an optional prop that provides a class to the header title */
  headerTitleClassName?: string;
  /** closeIconClassName: is an optional prop that provides a class to the close icon */
  closeIconClassName?: string;
  /** subHeaderTitle: is an optional prop for subheading title */
  subHeaderTitle?: string;
  /** subHeaderTitleClassName: is an optional prop that provides a class to the subheader title */
  subHeaderTitleClassName?: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  open,
  onClose,
  children,
  className,
  renderHeader,
  headerTitle,
  headerClassName = '',
  headerTitleClassName = '',
  subHeaderTitle,
  subHeaderTitleClassName = '',
  closeIconClassName,
  ...rest
}) => {
  const getHeaderContent = () => {
    let Component: React.JSX.Element | null = null;

    if (renderHeader) {
      Component = renderHeader();
    } else if (headerTitle) {
      Component = (
        <div className="customModal__left-header-container">
          <Typography className={`customModal__header-title ${headerTitleClassName}`}>
            {headerTitle}
          </Typography>
          <Typography className={`customModal__sub-header-title ${subHeaderTitleClassName}`}>
            {subHeaderTitle}
          </Typography>
        </div>
      );
    }

    return Component;
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition {...rest}>
      <>
        <Fade in={open}>
          <div className={`customModal__container ${className}`}>
            {getHeaderContent() && ( // Render header only if content exists
              <div className={`customModal__header ${headerClassName}`}>{getHeaderContent()}</div>
            )}
            <IconButton
              className={`customModal__iconContainer ${closeIconClassName}`}
              onClick={onClose}>
              <CloseIcon height={24} width={24} />
            </IconButton>
            {children}
          </div>
        </Fade>
      </>
    </Modal>
  );
};

export default CustomModal;
