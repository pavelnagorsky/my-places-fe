import { useAppDispatch } from "@/store/hooks";
import { showAlertThunk } from "@/store/alerts-slice/alerts.slice";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTranslation } from "next-i18next";

const formatCardNumber = (cardNumber: string) => {
  // Keep only digit symbols
  const digitsOnly = cardNumber.replace(/\D/g, "");

  // Divide in groups by 4 digits
  return digitsOnly.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const useDonation = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation("about");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const element = document.querySelector(hash);
      if (!element) return;
      setTimeout(() => {
        element.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      }, 100);
    };

    handleHashChange(); // on initial load

    router.events.on("hashChangeComplete", handleHashChange);
    return () => {
      router.events.off("hashChangeComplete", handleHashChange);
    };
  }, [router]);

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
            title: t("donation.copyFeedback"),
          },
          snackbarProps: {},
        })
      );
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optionally, show an error message to the user
    }
  };

  return { handleCopy, formatCardNumber };
};

export default useDonation;
