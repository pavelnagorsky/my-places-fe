import {
  Box,
  Button,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import locationImage from "/public/images/icons/location.png";
import { useTranslation } from "next-i18next";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";
import TextWithBrTags from "@/components/UI/text-with-br-tags/TextWithBrTags";
import utils from "@/shared/utils";
import arrowRightIcon from "/public/images/icons/arrow-right.png";
import { routerLinks } from "@/routing/routerLinks";
import PlaceReviewsSection from "@/containers/excursion/content/excursion-places/excursion-place-card/content/PlaceReviewsSection";
import { StyledTextCircle } from "@/components/search-cart/content/CartItem";

interface IExcursionPlaceCardProps {
  place: IExcursionPlace;
  index: number;
}

const ExcursionPlaceCard = ({ place, index }: IExcursionPlaceCardProps) => {
  const { t } = useTranslation(["excursion-management", "common"]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const formattedStayDuration = utils.formatMinutes(place.excursionDuration, {
    hoursTranslation: t("hours", { ns: "common" }),
    minutesTranslation: t("minutes", { ns: "common" }),
  });

  return (
    <Paper
      sx={{
        boxShadow: "0px 2px 30px 0px #0000000D",
        borderRadius: "10px",
        position: "relative",
        p: 2,
        minHeight: { md: "300px" },
      }}
    >
      <Stack width={"100%"} gap={2}>
        {isMobile && (
          <StyledTextCircle
            sx={{ position: "relative", top: 0, left: 0, mb: "-0.25em" }}
          >
            {index + 1}
          </StyledTextCircle>
        )}
        <Typography
          fontSize={"22px"}
          fontWeight={500}
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            WebkitLineClamp: 2,
          }}
        >
          {place.title}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
          <Image src={locationImage} alt={"Location"} height={24} width={24} />
          <Typography
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            variant="body2"
            fontSize={"18px"}
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: { xs: 3, md: 2 },
              overflow: "hidden",
            }}
          >
            {place.address}
          </Typography>
        </Stack>
        <Stack>
          <Typography fontSize={"16px"} color={"secondary.dark"}>
            <TextWithBrTags text={place.excursionDescription} />
          </Typography>
        </Stack>
        <Stack
          justifyContent={"space-between"}
          alignItems={{ xs: "end", sm: "center" }}
          direction={"row"}
          gap={"1em"}
        >
          <Typography color={"primary.main"} fontWeight={500}>
            {t("excursion.stayDuration")} {formattedStayDuration}
          </Typography>
          <Box>
            <Button
              component={"a"}
              href={routerLinks.place(place.slug)}
              target={"_blank"}
            >
              <Box
                height={"14px"}
                component={"img"}
                src={arrowRightIcon.src}
                alt={"Подробнее"}
              />
            </Button>
          </Box>
        </Stack>
        <PlaceReviewsSection reviews={place.reviews} />
      </Stack>
    </Paper>
  );
};

export default ExcursionPlaceCard;
