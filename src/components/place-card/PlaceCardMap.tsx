import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { ISearchPlace } from "@/services/search-service/interfaces/search-place.interface";
import { Button } from "@/components/UI/button/Button";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { routerLinks } from "@/routing/routerLinks";

const PlaceCardMap = ({ place }: { place: ISearchPlace }) => {
  const actionButton = (
    <Button
      linkTo={routerLinks.place(place.slug)}
      variant={"contained"}
      sx={{ p: 0 }}
    >
      <ArrowRightAltIcon sx={{ color: "white" }} />
    </Button>
  );

  return (
    <Card
      sx={{
        alignItems: "center",
        maxWidth: "360px",
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
          src={place.image || "/"}
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
        <Box display={{ md: "none" }}>
          <div>{actionButton}</div>
        </Box>
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
            fontWeight={400}
            variant="body2"
            fontSize={"12px"}
            display={"flex"}
            alignItems={"center"}
            flexGrow={1}
            sx={{ wordBreak: "break-word" }}
            gap={"0.5em"}
          >
            {place.type.title}
            <Box
              component={"img"}
              src={place.type.image as string}
              alt={place.type.title}
              sx={{
                objectFit: "cover",
                width: "20px",
                height: "20px",
              }}
            />
          </Typography>
          <Box display={{ xs: "none", md: "block" }}>{actionButton}</Box>
        </Stack>
      </Box>
    </Card>
  );
};

export default PlaceCardMap;
