import { PropsWithChildren } from "react";
import { Button as Btn, ButtonProps } from "@mui/material";
import NextLink from "next/link";

interface IButtonProps {
  linkTo?: string;
}

export function Button(props: PropsWithChildren & ButtonProps & IButtonProps) {
  return (
    <Btn
      variant={props.variant ?? "outlined"}
      color={props.color}
      fullWidth={props.fullWidth}
      component={props.linkTo !== undefined ? NextLink : "button"}
      href={props.linkTo}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
      sx={{
        fontWeight: 700,
        fontSize: {
          xs: "16px",
          md: "16px",
        },
        letterSpacing: "0.02em",
        borderRadius: "10px",
        borderWidth: "2px",
        "&:hover": {
          borderWidth: "2px",
        },
        color: "secondary.contrastText",
        py: "0.6em",
        px: "3em",
        ...props.sx,
      }}
    >
      {props.children}
    </Btn>
  );
}
