import React, { useState } from 'react';
import { Button, Switch, Tooltip } from '@mui/material';
import { Modal } from './Modal';

interface ModalSwitchConfirmationComponentProps {
  title: string;
  tooltipText: string;
  content: string;
  confirmCallback: () => Promise<void>;
  status: boolean;
  disabled?: boolean;
  confirmButtonText?: string;
  icon?: JSX.Element;
}

export const ModalSwitchConfirmationComponent = (
  props: ModalSwitchConfirmationComponentProps
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
    handleClose();
  };

  return (
    <>
      <Tooltip title={props.tooltipText} arrow>
        <Switch
          checked={props.status}
          onChange={handleClickOpen}
          inputProps={{ 'aria-label': 'primary checkbox' }}
          disabled={props.disabled}
        />
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
          {props.content}
        </Modal>
      )}
    </>
  );
};
