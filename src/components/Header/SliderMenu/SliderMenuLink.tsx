import { ReactElement } from "react";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";

interface ISliderMenuLinkProps {
  text: string;
  href: string;
  pathname: string;
  icon: ReactElement;
  onClick: () => void;
  sx?: SxProps;
}

const SliderMenuLink = ({
  icon,
  text,
  href,
  pathname,
  onClick,
  sx,
}: ISliderMenuLinkProps) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      alignItems={"center"}
      onClick={onClick}
      sx={sx}
    >
      <Box
        width={"100%"}
        sx={{
          "& a": {
            p: "0.5em",
            color: "secondary.main",
            "& .active": {
              color: "primary.main",
            },
            "&:hover": {
              color: "primary.main",
            },
          },
        }}
      >
        <NextMuiLink
          display={"flex"}
          alignItems={"center"}
          columnGap={"0.5em"}
          width={"100%"}
          href={href}
          className={pathname === href ? "active" : ""}
        >
          {icon}
          <Typography>{text}</Typography>
        </NextMuiLink>
      </Box>
    </Stack>
  );
};

export default SliderMenuLink;
