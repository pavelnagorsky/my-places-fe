import { Environment } from "@/shared/Environment";
import { Chip, Link, Stack, Typography } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";

function formatCardNumber(cardNumber: string) {
  // Keep only digit symbols
  const digitsOnly = cardNumber.replace(/\D/g, "");

  // Divide in groups by 4 digits
  return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
}

const Donation = () => {
  const cards = Environment.donationCards;
  const dispatch = useAppDispatch();

  // Function to handle the copy action
  const handleCopy = async (card: string) => {
    try {
      // Use the Clipboard API to write the card number
      await navigator.clipboard.writeText(card);
      // Show success notification
      dispatch(
        showAlertThunk({
          alertProps: {
            variant: "standard",
            severity: "success",
            title: "Номер карты скопирован в буфер обмена!",
          },
          snackbarProps: {},
        })
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Stack>
      <Typography
        id={"donation"}
        mb={{ xs: 2, md: 3 }}
        fontSize={{ xs: "30px", md: "35px" }}
        fontWeight={700}
      >
        Поддержите наше дело
      </Typography>
      <Stack gap={1}>
        {cards.map((card, index) => (
          <Chip
            key={index}
            icon={<CreditCardIcon />}
            label={formatCardNumber(card)}
            onClick={() => handleCopy(card)}
            deleteIcon={<ContentCopyIcon />}
            onDelete={() => handleCopy(card)}
            variant="outlined"
            sx={{
              alignItems: "center",
              padding: "8px",
              height: "auto",
              maxWidth: "300px",
              "& .MuiChip-label": {
                flex: 1,
                color: "secondary.main",
                fontSize: "14px",
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default Donation;
