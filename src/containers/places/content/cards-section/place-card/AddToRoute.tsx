import { useAppDispatch } from "@/store/hooks";
import AddIcon from "@mui/icons-material/Add";
import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import { addRouteItemsThunk } from "@/store/route-builder-slice/thunks";
import { useTranslation } from "next-i18next";
import { primaryBackground } from "@/styles/theme/lightTheme";

const AddToRoute = ({ placeId }: { placeId: number }) => {
  const { i18n } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useAppDispatch();

  const onAddToRoute = () => {
    dispatch(
      addRouteItemsThunk({
        ids: [placeId],
        language: i18n.language,
      })
    );
  };

  return (
    <IconButton
      onClick={onAddToRoute}
      size={isMobile ? "medium" : "small"}
      sx={{
        bgcolor: "primary.main",
        "&:hover": { bgcolor: "primary.main" },
        color: "white",
        position: "absolute",
        bottom: { xs: "3em", md: "unset" },
        top: { md: 0 },
        right: { xs: 0, md: "unset" },
        zIndex: 1,
        m: { xs: "0 0.3em 0 0", md: "0.5em" },
      }}
    >
      <AddIcon fontSize={isMobile ? "small" : "medium"} />
    </IconButton>
  );
};

export default AddToRoute;
