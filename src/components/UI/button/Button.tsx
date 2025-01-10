import { forwardRef, PropsWithChildren } from "react";
import { Button as Btn, ButtonProps } from "@mui/material";
import NextLink from "next/link";

interface IButtonProps {
  linkTo?: string;
}

export const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps & IButtonProps>
>(({ linkTo, ...props }, ref) => {
  return (
    <Btn
      ref={ref}
      {...props}
      variant={props.variant ?? "outlined"}
      component={linkTo !== undefined ? NextLink : "button"}
      href={linkTo}
      sx={{
        fontWeight: 500,
        fontSize: "16px",
        letterSpacing: "0.02em",
        borderRadius: "8px",
        borderWidth: "2px",
        "&:hover": {
          borderWidth: "2px",
        },
        color:
          props.variant !== "contained" ? "secondary.contrastText" : "white",
        py: "0.6em",
        px: "3em",
        ...props.sx,
      }}
    >
      {props.children}
    </Btn>
  );
});

Button.displayName = "Button";
