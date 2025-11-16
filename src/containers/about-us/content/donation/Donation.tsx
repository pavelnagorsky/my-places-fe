import { Environment } from "@/shared/Environment";
import { Chip, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Grid from "@mui/material/Grid2";
import useDonation from "@/containers/about-us/content/donation/logic/useDonation";
import { useTranslation } from "next-i18next";

const Donation = () => {
  const cards = Environment.donationCards;
  const { formatCardNumber, handleCopy } = useDonation();
  const { t } = useTranslation("about");

  return (
    <Stack id={"donation"}>
      <Typography mb={2} fontSize={{ xs: "30px", md: "35px" }} fontWeight={700}>
        {t("donation.title")}
      </Typography>
      <Typography
        mb={{ xs: 2, md: 3 }}
        variant={"body2"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        {t("donation.description")}
      </Typography>
      <Stack gap={{ xs: 2, md: 1 }}>
        {cards.map((cardData) => {
          return (
            <Grid
              key={cardData.cardNumber}
              sx={{ maxWidth: "400px" }}
              container
              spacing={{ xs: 1, md: 2 }}
              alignItems={{ md: "center" }}
            >
              <Grid size={{ xs: 12, md: 3.5 }}>
                <Typography fontWeight={500}>{cardData.bank}</Typography>
              </Grid>
              <Grid size={{ xs: 12, md: 8.5 }}>
                <Chip
                  icon={<CreditCardIcon />}
                  label={formatCardNumber(cardData.cardNumber)}
                  onClick={() => handleCopy(cardData.cardNumber)}
                  deleteIcon={<ContentCopyIcon />}
                  onDelete={() => handleCopy(cardData.cardNumber)}
                  variant="outlined"
                  sx={{
                    alignItems: "center",
                    padding: "8px",
                    height: "auto",
                    width: "100%",
                    "& .MuiChip-label": {
                      flex: 1,
                      color: "secondary.main",
                      fontSize: "16px",
                    },
                  }}
                />
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Donation;
