import { Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";
import useCardsConfig from "@/containers/home/content/places-section/logic/useCardsConfig";
import PlaceSectionCard from "@/containers/home/content/places-section/content/PlaceSectionCard";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";

const PlacesSection = () => {
  const { t } = useTranslation("home");
  const config = useCardsConfig();

  return (
    <WrappedContainer>
      <Stack gap={2}>
        <Stack>
          <Typography
            component="h2"
            sx={{
              fontWeight: 500,
              lineHeight: "120%",
              fontSize: { xs: "26px", md: "42px" },
              pb: 0,
            }}
          >
            {t("places.title")}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={2} alignItems={"end"}>
          {config.map((card, i) => (
            <PlaceSectionCard config={card} key={i} />
          ))}
        </Stack>
      </Stack>
    </WrappedContainer>
  );
};

export default PlacesSection;
