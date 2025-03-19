import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Image from "next/image";
import locationImage from "/public/images/icons/location.png";
import { useTranslation } from "next-i18next";
import { IExcursionPlace } from "@/services/excursions-service/interfaces/excursion-place.interface";
import TextWithBrTags from "@/components/UI/text-with-br-tags/TextWithBrTags";
import utils from "@/shared/utils";
import arrowRightIcon from "/public/images/icons/arrow-right.png";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";

interface IExcursionPlaceCardProps {
  place: IExcursionPlace;
}

const ExcursionPlaceCard = ({ place }: IExcursionPlaceCardProps) => {
  const { i18n, t } = useTranslation(["excursion-management", "common"]);
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
      }}
    >
      <Stack width={"100%"} gap={2}>
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
          <Stack
            direction={{ sm: "row" }}
            alignItems={{ sm: "center" }}
            gap={"1em"}
          >
            <Typography color={"secondary.dark"}>
              {t("form.durationSelect")} {formattedStayDuration}
            </Typography>
          </Stack>
          <Box>
            <Button component={NextLink} href={routerLinks.place(place.slug)}>
              <Box
                component={"img"}
                src={arrowRightIcon.src}
                alt={"Подробнее"}
              />
            </Button>
          </Box>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default ExcursionPlaceCard;
