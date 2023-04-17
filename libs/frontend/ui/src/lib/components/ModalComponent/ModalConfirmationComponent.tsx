import React, { useState } from 'react';
import { Button, Tooltip } from '@mui/material';
import { Modal } from './Modal';

interface ModalConfirmationComponentProps {
  title: string;
  tooltipText: string;
  content: string;
  actionButtonText: string;
  confirmCallback: () => Promise<void> | void;
  confirmButtonText?: string;
  icon?: JSX.Element;
  disabled?: boolean;
}

export const ModalConfirmationComponent = (
  props: ModalConfirmationComponentProps
): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleClickOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleConfirm = async (): Promise<void> => {
    setDisabled(true);
    await props.confirmCallback();
    setDisabled(false);
    handleClose();
  };

  return (
    <>
      <Tooltip title={props.tooltipText} arrow>
        <Button
          onClick={handleClickOpen}
          startIcon={props.icon}
          disabled={props.disabled}
        >
          {props.actionButtonText}
        </Button>
      </Tooltip>

      {open && (
        <Modal
          open={open}
          onClose={handleClose}
          handleClose={handleClose}
          title={props.title}
          maxWidth={'md'}
          buttonsCollection={
            <>
              <Button disabled={disabled} onClick={handleConfirm}>
                {props.confirmButtonText ?? 'Удалить'}
              </Button>
              <Button onClick={handleClose}>Отмена</Button>
            </>
          }
        >
          <span
            dangerouslySetInnerHTML={{
              __html: props.content,
            }}
          />
        </Modal>
      )}
    </>
  );
};
