import React, { FC, ReactElement } from 'react';
import {
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { ModalDialogStyled } from './styles/ModalDialogStyled';

interface ModalProps extends DialogProps {
  handleClose?: () => void;
  buttonsCollection?: ReactElement[] | ReactElement;
  title?: string;
}

export const Modal: FC<ModalProps> = (props) => {
  return (
    <ModalDialogStyled
      maxWidth={props.maxWidth}
      onClose={props.handleClose}
      open={props.open}
      fullWidth
    >
      <DialogTitle>
        {props.title}
        {props.handleClose && (
          <IconButton aria-label="close" onClick={props.handleClose}>
            <Close />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent dividers>{props.children}</DialogContent>

      {props.buttonsCollection && (
        <DialogActions>{props.buttonsCollection}</DialogActions>
      )}
    </ModalDialogStyled>
  );
};
