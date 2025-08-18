import {
  Box,
  Button,
  Collapse,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Map from "@/components/map/Map";
import { Marker } from "@react-google-maps/api";
import { useTranslation } from "next-i18next";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const MapSection = ({ place }: { place: IPlace }) => {
  const { t } = useTranslation("place");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [isMapVisible, setIsMapVisible] = useState(false);

  return (
    <Box mb={"2em"}>
      <Stack
        direction={{ sm: "row" }}
        justifyContent={{ sm: "space-between" }}
        alignItems={{ sm: "center" }}
        mb={3}
        gap={2}
        sx={{ cursor: isMapVisible ? "default" : "pointer" }}
        onClick={() => setIsMapVisible(true)}
      >
        <Typography
          variant={"h2"}
          component={"h2"}
          pb={0}
          fontSize={{ xs: "24px", md: "30px" }}
        >
          {t("location")}
        </Typography>
        {!isMapVisible && (
          <Button
            variant={"contained"}
            color={"primary"}
            endIcon={<ArrowDropDownIcon />}
            onClick={() => setIsMapVisible(true)}
          >
            {t("showMap")}
          </Button>
        )}
      </Stack>

      <Collapse in={isMapVisible} mountOnEnter>
        <Map
          containerStyle={{ height: isMobile ? "300px" : "400px" }}
          fitCoordinates={[place.coordinates]}
        >
          <Marker position={place.coordinates} />
        </Map>
      </Collapse>

      <Stack direction={"row"} alignItems={"center"} gap={"1em"} pt={"1em"}>
        <Button
          component={"a"}
          target={"_blank"}
          href={`https://www.google.com/maps?q=${place.coordinates.lat},${place.coordinates.lng}`}
          startIcon={<NearMeIcon color={"primary"} />}
          variant={"outlined"}
          color={"secondary"}
        >
          {t("navigator.google")}
        </Button>
        <Button
          component={"a"}
          target={"_blank"}
          href={`https://yandex.com/maps/?pt=${place.coordinates.lng},${place.coordinates.lat}&z=16`}
          variant={"outlined"}
          startIcon={<NearMeIcon color={"primary"} />}
          color={"secondary"}
        >
          {t("navigator.yandex")}
        </Button>
      </Stack>
    </Box>
  );
};

export default MapSection;
