import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { FC } from 'react';

interface ButtonLinkComponentProps {
  buttonText: string;
  to: string;
  disabled?: boolean;
  tooltipText?: string;
}

export const ButtonLinkComponent: FC<ButtonLinkComponentProps> = (props) => {
  const button = (
    <Button component={Link} to={props.to} disabled={props.disabled}>
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
