import { LinkProps, Link as MuiLink } from "@mui/material";
import NextLink from "next/link";

export default function NextMuiLink(props: LinkProps<"a">) {
  // @ts-ignore
  return (
    <MuiLink
      component={NextLink}
      {...props}
      underline={props.underline || "none"}
    />
  );
}
