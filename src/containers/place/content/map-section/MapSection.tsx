import {
  Box,
  Button,
  Collapse,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Map from "@/components/map/Map";
import { Marker } from "@react-google-maps/api";
import { useTranslation } from "next-i18next";
import { IPlace } from "@/services/places-service/interfaces/place.interface";
import { useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NavigationControls from "@/containers/place/content/map-section/content/NavigationControls";

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
        mb={2}
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
            size={"large"}
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

      <NavigationControls coordinates={place.coordinates} />
    </Box>
  );
};

export default MapSection;
