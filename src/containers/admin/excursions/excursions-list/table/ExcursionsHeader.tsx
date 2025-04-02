import { debounce, InputAdornment, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { TextFieldElement } from "react-hook-form-mui";
import SearchIcon from "@mui/icons-material/Search";
import AdditionalFilters from "@/containers/admin/excursions/excursions-list/table/filters/AdditionalFilters";

interface IHeaderProps {
  onSubmit: () => void;
}

const ExcursionsHeader = ({ onSubmit }: IHeaderProps) => {
  return (
    <Stack
      gap={"1em"}
      direction={{ md: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"1em"}
    >
      <Typography
        component={motion.span}
        initial={{ x: -20 }}
        animate={{ x: 0, transition: { delay: 0.2 } }}
        fontWeight={700}
        fontSize={{ xs: "25px", md: "30px" }}
      >
        Список экскурсий
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
          <AdditionalFilters onSubmit={onSubmit} />
        </motion.div>
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
              minWidth: {
                sm: "300px",
              },
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

export default ExcursionsHeader;
