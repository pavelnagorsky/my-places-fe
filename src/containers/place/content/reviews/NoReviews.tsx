import { Card, Stack, Typography } from "@mui/material";
import { Button } from "@/components/UI/button/Button";
import { useTranslation } from "next-i18next";

const NoReviews = ({ link }: { link: string }) => {
  const { t } = useTranslation("place");

  return (
    <Card
      sx={{
        px: "1em",
        py: "1.5em",
        borderRadius: "10px",
        boxShadow: "2px 2px 15px 2px rgba(0, 0, 0, 0.20)",
        border: "0.5px solid #FF7900",
        position: "relative",
      }}
    >
      <Typography fontSize={"18px"} mb={"0.5em"} fontWeight={600}>
        {t("reviews.noReviews")}
      </Typography>
      <Typography variant={"body2"} mb={"1.5em"}>
        {t("reviews.reviewDescription")}
      </Typography>
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          sx={{
            width: "100%",
            maxWidth: "400px",
            px: 0,
            fontSize: { xs: "14px", lg: "16px" },
          }}
          linkTo={link}
          variant={"contained"}
        >
          {t("reviews.createReview")}
        </Button>
      </Stack>
    </Card>
  );
};

export default NoReviews;
