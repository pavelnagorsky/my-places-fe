import { Box, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";

const PlaceCategories = ({ categories }: { categories: IPlaceCategory[] }) => {
  const { t } = useTranslation("place");

  return (
    <>
      <Typography
        variant={"h2"}
        component={"h2"}
        fontSize={{ xs: "24px", md: "30px" }}
      >
        {t("categories")}
      </Typography>
      <Grid container spacing={"2em"} mb={"2em"}>
        {categories.map((c) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={c.id}>
            <Stack direction={"row"} alignItems={"center"} gap={"0.5em"}>
              {c.image && (
                <Box
                  bgcolor={"#FFE9D6"}
                  borderRadius={"5px"}
                  position={"relative"}
                  p={"0.5em"}
                  height={56}
                  width={56}
                  sx={{
                    "& img": {
                      objectFit: "cover",
                    },
                  }}
                >
                  <Image
                    src={c.image}
                    alt={c.title}
                    priority
                    height={40}
                    width={40}
                  />
                </Box>
              )}
              <Typography
                variant={"body2"}
                fontSize={{ xs: "16px", md: "20px" }}
              >
                {c.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default PlaceCategories;
