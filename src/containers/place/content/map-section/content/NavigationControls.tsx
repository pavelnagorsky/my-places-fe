import { Button, Stack } from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import { useTranslation } from "next-i18next";
import { ILatLngCoordinate } from "@/components/map/Map";

const NavigationControls = ({
  coordinates,
}: {
  coordinates: ILatLngCoordinate;
}) => {
  const { t } = useTranslation("place");

  return (
    <Stack direction={"row"} alignItems={"center"} gap={"1em"} pt={"1em"}>
      <Button
        component={"a"}
        target={"_blank"}
        href={`https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}&travelmode=driving`}
        startIcon={<NearMeIcon color={"primary"} />}
        variant={"outlined"}
        color={"secondary"}
      >
        {t("navigator.google")}
      </Button>
      <Button
        component={"a"}
        target={"_blank"}
        href={`https://yandex.com/maps/?pt=${coordinates.lng},${coordinates.lat}&z=16&rtext=~${coordinates.lat},${coordinates.lng}&rtt=auto`}
        variant={"outlined"}
        startIcon={<NearMeIcon color={"primary"} />}
        color={"secondary"}
      >
        {t("navigator.yandex")}
      </Button>
    </Stack>
  );
};

export default NavigationControls;
