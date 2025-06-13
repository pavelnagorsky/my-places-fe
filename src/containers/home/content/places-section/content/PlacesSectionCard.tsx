import { ICardConfig } from "@/containers/home/content/places-section/logic/interfaces";
import {
  Box,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";

const PlacesSectionCard = ({ config }: { config: ICardConfig }) => {
  const filterBlock = config.filter ? (
    <Stack
      bgcolor={"#F3F3F3"}
      borderRadius={"20px"}
      direction={"row"}
      alignItems={"center"}
      gap={2}
      p={2}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        transition: "box-shadow .2s",
        "&:hover": { boxShadow: 1 },
      }}
      component={NextLink}
      href={config.filter.filterValue}
    >
      <Image
        src={config.filter.image}
        alt={config.filter.title}
        priority
        height={54}
        width={54}
      />
      <Stack gap={"2px"}>
        <Typography fontSize={"20px"} fontWeight={500} color={"secondary.dark"}>
          {config.filter.title}
        </Typography>
        <Typography fontSize={"18px"} fontWeight={500} color={"#A9A9A9"}>
          {config.filter.placesCount} мест
        </Typography>
      </Stack>
    </Stack>
  ) : null;

  const imagesBlock = (
    <ImageList
      variant="masonry"
      cols={config.images.length > 1 ? 2 : 1}
      gap={12}
    >
      {config.images.map((image, i) => (
        <ImageListItem key={i}>
          <Box
            sx={{
              position: "relative", // Required for Next.js Image fill
              height: "100%",
              aspectRatio: `${image.width}/${image.height}`,
            }}
          >
            <Image
              src={image.src}
              fill
              style={{
                objectFit: "cover",
                display: "block",
                borderRadius: "20px",
              }}
              sizes="(max-width: 768px) 100vw, 50vw"
              alt={`place-image-${i}`}
              loading="lazy"
              quality={85}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
            />
          </Box>
        </ImageListItem>
      ))}
    </ImageList>
  );

  const clickableSection = config.clickableSection ? (
    <Stack
      bgcolor={"#F3F3F3"}
      borderRadius={"20px"}
      gap={1}
      p={2}
      mb={"6px"}
      sx={{
        cursor: "pointer",
        textDecoration: "none",
        transition: "box-shadow .2s",
        "&:hover": { boxShadow: 1 },
      }}
      component={NextLink}
      href={config.clickableSection.filterValue}
    >
      <Image
        src={config.clickableSection.icon}
        alt={config.clickableSection.title}
        priority
        quality={85}
        height={28}
        width={28}
      />
      <Typography
        fontSize={"22px"}
        fontWeight={500}
        mb={1}
        color={"secondary.dark"}
      >
        {config.clickableSection.title}
      </Typography>
      <Stack>{imagesBlock}</Stack>
    </Stack>
  ) : null;

  return (
    <Stack gap={2} width={"100%"} minWidth={"288px"}>
      {filterBlock}
      {clickableSection || imagesBlock}
    </Stack>
  );
};

export default PlacesSectionCard;
