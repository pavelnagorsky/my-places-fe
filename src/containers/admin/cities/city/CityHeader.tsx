import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { motion } from "framer-motion";
import DeleteIcon from "@mui/icons-material/Delete";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MapIcon from "@mui/icons-material/Map";
import { useFormContext } from "react-hook-form-mui";
import SaveIcon from "@mui/icons-material/Save";
import { ICityFormContext } from "@/containers/admin/cities/city/interfaces";
import useCity from "@/containers/admin/cities/city/useCity";

const CityHeader = () => {
  const logic = useCity();
  const { watch, formState } = useFormContext<ICityFormContext>();

  const names = watch("titleTranslations");
  const title = names[0].text;

  return (
    <Stack
      gap={"1em"}
      direction={{ sm: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"2em"}
    >
      <Stack alignItems={{ xs: "center", sm: "start" }} width={"100%"}>
        <motion.div
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.3 } }}
        >
          <Typography
            fontWeight={500}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: "0.5em",
              textDecoration: "none",
            }}
            component={Link}
            role="button"
            href={"/administration/cities"}
            color="inherit"
          >
            <KeyboardBackspaceIcon />
            <Box component={"span"} mx={"0.2em"}>
              города
            </Box>
          </Typography>
        </motion.div>

        <Stack
          direction={"row"}
          alignItems={"center"}
          component={motion.div}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { delay: 0.3 } }}
        >
          <Box display={{ xs: "none", sm: "block" }}>
            <MapIcon
              sx={{
                color: "divider",
                width: { xs: "32px", sm: "48px" },
                height: { xs: "32px", sm: "48px" },
              }}
            />
          </Box>
          <Stack
            component={motion.div}
            alignItems={{ xs: "center", sm: "start" }}
            mx={{ xs: "0.5em", sm: "1em" }}
            initial={{ x: -20 }}
            animate={{ x: 0, transition: { delay: 0.3 } }}
          >
            <Typography
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
              fontSize={{ xs: "20px", md: "25px" }}
              fontWeight={600}
            >
              {title || "Новый город"}
            </Typography>
            <Typography variant="caption" fontSize={"12px"} fontWeight={500}>
              Настройки города
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <Stack
        gap={"1em"}
        direction={{ md: "row" }}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Box
          component={motion.div}
          sx={{ display: "flex", gap: "1em" }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          {logic.editMode && (
            <Button
              sx={{
                fontWeight: 600,
                boxShadow: "unset",
                borderRadius: "20px",
                py: "0.6em",
              }}
              variant="outlined"
              color="error"
              onClick={logic.handleDelete}
              startIcon={
                logic.loadingDelete ? (
                  <CircularProgress color={"inherit"} size={20} />
                ) : (
                  <DeleteIcon />
                )
              }
            >
              Удалить
            </Button>
          )}
          <Button
            sx={{
              fontWeight: 600,
              boxShadow: "unset",
              borderRadius: "20px",
              py: "0.6em",
            }}
            variant="contained"
            color="primary"
            disabled={!formState.isDirty}
            onClick={logic.handleSave}
            startIcon={
              logic.loading ? (
                <CircularProgress color={"inherit"} size={20} />
              ) : (
                <SaveIcon />
              )
            }
          >
            {logic.editMode ? "Обновить" : "Сохранить"}
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
};

export default CityHeader;
