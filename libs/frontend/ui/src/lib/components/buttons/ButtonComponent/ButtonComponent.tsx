import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';

interface ButtonComponentProps {
  buttonText: string;
  onClick: () => void;
  disabled?: boolean;
  tooltipText?: string;
}

export const ButtonComponent = (props: ButtonComponentProps): JSX.Element => {
  const button = (
    <Button onClick={props.onClick} disabled={props.disabled}>
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
