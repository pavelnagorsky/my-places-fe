import { Box, Grid, SxProps, Typography } from "@mui/material";

import { Button } from "../UI/button/Button";
import Image, { StaticImageData } from "next/image";

export interface ITextAndImageProps {
  showImageMobile?: boolean;
  reverse?: boolean;
  title?: string;
  subtitle?: string;
  description: string;
  btnText?: string;
  linkTo?: string;
  image: StaticImageData;
  titleComponent?: "h1" | "h2";
  sx?: SxProps;
}

// provides row with image and article
function TextAndImage({
  linkTo,
  showImageMobile,
  reverse,
  title,
  subtitle,
  description,
  btnText,
  image,
  titleComponent,
  sx,
}: ITextAndImageProps) {
  return (
    <Grid
      my={{ xs: "2em", md: "5em" }}
      container
      columnSpacing={{ xs: "0", md: "4em", lg: "7em" }}
      direction={reverse ? "row-reverse" : undefined}
      sx={{
        display: "flex",
        alignItems: "center",
        ...sx,
      }}
    >
      <Grid item xs={12} md={6}>
        {title && (
          <Typography
            variant="h1"
            component={titleComponent || "h2"}
            className={"title"}
          >
            {title}
          </Typography>
        )}
        {subtitle && (
          <Typography
            variant="body2"
            color="secondary.contrastText"
            fontWeight={600}
            mb="1em"
            className={"subtitle"}
          >
            {subtitle}
          </Typography>
        )}
        <Typography
          variant="body2"
          fontSize={{ xs: "16px", md: "18px" }}
          className={"description"}
        >
          {description}
        </Typography>
        {!!btnText && !!linkTo && (
          <Button
            variant={"contained"}
            sx={{
              //mt: 3.5,
              mt: "2.5em",
              py: "1em",
              width: { xs: "100%", sm: "initial" },
              fontWeight: 700,
            }}
            linkTo={linkTo}
          >
            {btnText}
          </Button>
        )}
      </Grid>
      <Grid item xs={showImageMobile ? 12 : 0} md={6}>
        <Box
          // component={Image}
          // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          position={"relative"}
          sx={{
            display: {
              xs: showImageMobile ? "block" : "none",
              md: "flex",
            },
            borderRadius: {
              xs: "0px 180px 180px 0px",
              md: reverse ? "180px 0px 180px 180px" : "180px 180px 180px 0px",
            },
            mb: { xs: showImageMobile ? "1em" : "0em", md: "0em" },
            mt: { xs: showImageMobile ? "3em" : "0em", md: "0em" },
            width: { xs: "100%", sm: "50%", md: "100%" },
            height: "100%",
            maxHeight: "320px",
            minHeight: { xs: "220px", md: "320px" },
            "& img": {
              objectFit: "cover",
            },
          }}
          // src={image}
          // alt={title}
        >
          <Image
            src={image}
            alt={title || "Belarus immage"}
            style={{ borderRadius: "inherit" }}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Box>
      </Grid>
    </Grid>
  );
}

export default TextAndImage;
