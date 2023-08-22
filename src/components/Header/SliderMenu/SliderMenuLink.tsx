import { ReactElement } from "react";
import { Box, Stack, Typography } from "@mui/material";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";

interface ISliderMenuLinkProps {
  text: string;
  href: string;
  pathname: string;
  icon: ReactElement;
  onClick: () => void;
}

const SliderMenuLink = ({
  icon,
  text,
  href,
  pathname,
  onClick,
}: ISliderMenuLinkProps) => {
  return (
    <Stack
      direction={"row"}
      width={"100%"}
      alignItems={"center"}
      onClick={onClick}
    >
      <Box
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
