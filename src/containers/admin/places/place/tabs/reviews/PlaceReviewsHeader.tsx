import { debounce, InputAdornment, Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { motion } from "framer-motion";
import AdditionalFilters from "@/containers/personal-area/my-places/filters/AdditionalFilters";
import { TextFieldElement } from "react-hook-form-mui";
import SearchIcon from "@mui/icons-material/Search";

const PlaceReviewsHeader = ({ onSubmit }: { onSubmit: () => void }) => {
  return (
    <Stack
      gap={"1em"}
      direction={{ sm: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"0.5em"}
    >
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        fontWeight={600}
        fontSize={{ xs: "20px", md: "25px" }}
      >
        Заметки к месту
      </Typography>

      <Stack
        gap={"1em"}
        direction={"row"}
        alignItems={"center"}
        justifyContent={"end"}
        sx={{
          "& .MuiIconButton-root": {
            backgroundColor: "white",
          },
        }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
        >
          <TextFieldElement
            InputProps={{
              startAdornment: (
                <InputAdornment position={"start"}>
                  <SearchIcon color="disabled" />
                </InputAdornment>
              ),
            }}
            placeholder="Поиск по названию"
            sx={{
              backgroundColor: "white",
            }}
            fullWidth
            name={"search"}
            onChange={debounce(onSubmit, 300)}
            inputProps={{
              "aria-label": "Search",
            }}
          />
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default PlaceReviewsHeader;
