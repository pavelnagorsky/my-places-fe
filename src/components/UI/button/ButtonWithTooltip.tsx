import { ButtonProps, CircularProgress, Tooltip } from "@mui/material";
import { Button } from "@/components/UI/button/Button";

interface IButtonWithTooltipProps extends ButtonProps {
  tooltipText: string;
  buttonText: string;
  loading: boolean;
}

const ButtonWithTooltip = ({
  tooltipText,
  buttonText,
  children,
  sx,
  disabled,
  onClick,
  loading,
  ...other
}: IButtonWithTooltipProps) => {
  const adjustedButtonProps = {
    disabled: disabled,
    onClick: disabled ? undefined : onClick,
  };
  return (
    <Button
      {...other}
      {...adjustedButtonProps}
      sx={{
        "&.Mui-disabled": {
          pointerEvents: "all",
        },
        ...sx,
      }}
    >
      {disabled && !loading ? (
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
          title={tooltipText}
        >
          <p style={{ width: "100%" }}>{buttonText}</p>
        </Tooltip>
      ) : loading ? (
        <CircularProgress size={25} color={"inherit"} />
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default ButtonWithTooltip;
