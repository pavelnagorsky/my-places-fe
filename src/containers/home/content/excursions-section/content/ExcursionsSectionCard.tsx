import {
  Box,
  Chip,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import NextLink from "next/link";
import Link from "next/link";
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
      alignItems={"center"}
    >
      <Image
        src={config.image}
        alt={config.title}
        fill
        sizes={"(max-width: 640px) 100vw, (max-width: 768px) 50vw, 40vw"}
        style={{ objectFit: "cover" }}
      />
      <Stack
        width={"100%"}
        top={0}
        position={"absolute"}
        zIndex={1}
        p={{ xs: "16px", md: "25px" }}
        direction={"row"}
        justifyContent={"space-between"}
        // alignItems={"center"}
      >
        <Stack direction={"row"} flexWrap={"wrap"} gap={1}>
          {(config.chips ?? []).map((chip, i) => (
            <div key={i}>
              <Chip
                clickable
                key={i}
                label={chip.title}
                component={Link}
                href={chip.filterValue}
                sx={{
                  bgcolor: primaryBackground,
                  "&:hover": {
                    bgcolor: "white",
                  },
                  color: "primary.main",
                  fontSize: { xs: "13px", md: "17px" },
                  fontWeight: 500,
                }}
              />
            </div>
          ))}
        </Stack>
        <Box>
          <IconButton
            color={"primary"}
            sx={{
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
            href={config.filterValue}
          >
            <ArrowRightIcon fontSize={isMobile ? "medium" : "large"} />
          </IconButton>
        </Box>
      </Stack>
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
