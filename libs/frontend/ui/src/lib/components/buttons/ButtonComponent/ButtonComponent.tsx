import Button, { ButtonProps } from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { FC } from 'react';

interface ButtonComponentProps {
  buttonText: string;
  tooltipText?: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: ButtonProps['type'];
}

export const ButtonComponent: FC<ButtonComponentProps> = (props) => {
  const button = (
    <Button type={props.type} onClick={props.onClick} disabled={props.disabled}>
      {props.buttonText}
    </Button>
  );

  return props.tooltipText ? (
    <Tooltip title={props.tooltipText}>
      <span>{button}</span>
    </Tooltip>
  ) : (
    button
  );
};
