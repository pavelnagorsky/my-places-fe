import {
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import { routerLinks } from "@/routing/routerLinks";
import { ICardConfig } from "@/containers/home/content/excursions-section/logic/interfaces";
import ArrowRightIcon from "@/components/UI/custom-icons/ArrowRightIcon";
import { primaryBackground } from "@/styles/theme/lightTheme";

const ExcursionsSectionCard = ({ config }: { config: ICardConfig }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Stack
      borderRadius={"20px"}
      position={"relative"}
      height={{ xs: "438px", md: "650px" }}
      overflow={"hidden"}
    >
      <Image
        src={config.image}
        alt={config.title}
        fill
        style={{ objectFit: "cover" }}
      />
      {!!config.chips && (
        <Stack
          direction={"row"}
          position={"absolute"}
          zIndex={1}
          top={{ xs: "16px", md: "25px" }}
          left={{ xs: "16px", md: "25px" }}
          right={{ xs: "75px", md: "95px" }}
          flexWrap={"wrap"}
          gap={1}
        >
          {config.chips.map((chip, i) => (
            <div key={i}>
              <Chip
                key={i}
                label={chip}
                sx={{
                  bgcolor: primaryBackground,
                  color: "primary.main",
                  fontSize: { xs: "13px", md: "17px" },
                  fontWeight: 500,
                }}
              />
            </div>
          ))}
        </Stack>
      )}
      <IconButton
        color={"primary"}
        sx={{
          position: "absolute",
          top: { xs: "16px", md: "25px" },
          right: { xs: "16px", md: "25px" },
          zIndex: 1,
          color: "white",
          backgroundColor: "primary.main",
          width: { xs: "51px", md: "76px" },
          height: { xs: "34px", md: "auto" },
          borderRadius: "100px",
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
        component={NextLink}
        href={routerLinks.excursions}
      >
        <ArrowRightIcon fontSize={isMobile ? "medium" : "large"} />
      </IconButton>
      <Stack
        position={"absolute"}
        zIndex={1}
        p={{ xs: "16px", md: "25px" }}
        bottom={0}
        gap={2}
      >
        <Typography
          color={"white"}
          fontWeight={500}
          fontSize={{ xs: "26px", md: "32px" }}
          lineHeight={"110%"}
        >
          {config.title}
        </Typography>
        <Typography
          color={"white"}
          fontWeight={500}
          fontSize={{ xs: "13px", md: "16px" }}
          lineHeight={"135%"}
        >
          {config.description}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default ExcursionsSectionCard;
