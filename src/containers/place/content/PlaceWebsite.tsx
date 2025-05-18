import { Link, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const PlaceWebsite = ({ website }: { website: string }) => {
  const { t } = useTranslation("place");

  return (
    <Stack direction={"row"} mt={"0.7em"} alignItems={"center"} gap={"0.5em"}>
      <Typography
        variant="body1"
        fontSize={{ xs: "16px", md: "20px" }}
        sx={{ whiteSpace: "nowrap" }}
      >
        {t("website")}
      </Typography>
      <Link
        target={"_blank"}
        referrerPolicy={"no-referrer"}
        href={website}
        sx={{
          fontSize: "16px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "200px",
          whiteSpace: "nowrap",
          display: "inline-block",
        }}
        color={"#303030"}
      >
        {website}
      </Link>
    </Stack>
  );
};

export default PlaceWebsite;
