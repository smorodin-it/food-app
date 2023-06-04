import React, { FC, ReactElement, useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { Modal } from './Modal';

interface DocumentTypeAddModalProps {
  title: string;
  tooltipText: string;
  children: ReactElement;
  icon?: ReactElement;
  disabled?: boolean;
}

export const ModalComponent: FC<DocumentTypeAddModalProps> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  // Clone children element and add isModal and close handler props
  const ChildrenComponent: () => ReactElement = () =>
    React.cloneElement(props.children, {
      handleModalClose: handleClose,
    });

  return (
    <>
      <Tooltip title={props.tooltipText} arrow>
        <Button
          onClick={handleClickOpen}
          startIcon={props.icon}
          disabled={props.disabled}
        >
          {props.title}
        </Button>
      </Tooltip>

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          handleClose={handleClose}
          title={props.title}
          maxWidth={'md'}
        >
          <ChildrenComponent />
        </Modal>
      )}
    </>
  );
};
