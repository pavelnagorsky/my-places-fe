import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { secondaryLightColor } from "@/styles/theme/lightTheme";
import CastleOutlinedIcon from "@mui/icons-material/CastleOutlined";
import { ISearchPlace } from "@/services/places-service/search-place.interface";
import { Button } from "@/components/UI/Button/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { routerLinks } from "@/staticData/routerLinks";

const PlaceCardMap = ({ place }: { place: ISearchPlace }) => {
  return (
    <Card
      sx={{
        alignItems: "center",
        maxWidth: "340px",
        // maxHeight: "161px",
        // borderRadius: "10px",
        display: "flex",
      }}
    >
      <CardMedia
        sx={{
          position: "relative",
          display: { xs: "none", sm: "block" },
        }}
      >
        <Image
          style={{ objectFit: "cover" }}
          priority
          height={121}
          width={176}
          src={place.image}
          alt={place.title}
        />
      </CardMedia>
      <Box
        sx={{
          alignSelf: "normal",
          display: "flex",
          p: { xs: "0.5em", sm: "1em" },
          paddingRight: { xs: "0.5em", sm: "0.5em" },
          gap: "0.5em",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Typography
          fontSize={"16px"}
          fontWeight={500}
          // overflow={"hidden"}
          // whiteSpace={"nowrap"}
          // textOverflow={"ellipsis"}
        >
          {place.title}
        </Typography>
        <Typography fontWeight={300} variant="body1" fontSize={"12px"}>
          {place.categories.map((c) => c.title).join(" | ")}
        </Typography>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"0.5em"}
        >
          <Typography
            fontWeight={300}
            variant="body2"
            fontSize={"12px"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            sx={{ wordBreak: "break-word" }}
            gap={{ xs: "0.3em", sm: "0.5em" }}
          >
            {place.type.title}
            <CastleOutlinedIcon sx={{ color: secondaryLightColor }} />
          </Typography>
          <Button
            linkTo={routerLinks.place(place.slug)}
            variant={"contained"}
            sx={{ p: 0 }}
          >
            <ArrowRightAltIcon sx={{ color: "white" }} />
          </Button>
        </Stack>
      </Box>
    </Card>
  );
};

export default PlaceCardMap;
