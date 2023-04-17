import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { Modal } from './Modal';

interface DocumentTypeAddModalProps {
  title: string;
  tooltipText: string;
  children: JSX.Element;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const ModalComponent = (
  props: DocumentTypeAddModalProps
): JSX.Element => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  // Clone children element and add isModal and close handler props
  const ChildrenComponent: () => JSX.Element = () =>
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
