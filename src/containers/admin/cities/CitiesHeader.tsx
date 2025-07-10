import { Button, Input, Paper, Stack, Typography } from "@mui/material";
import { motion } from "framer-motion";
import Link from "next/link";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { ICMSHeaderProps } from "@/containers/admin/interfaces";

const CitiesHeader = ({ onSearch }: ICMSHeaderProps) => {
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
        Города
      </Typography>

      <Stack
        gap={"1em"}
        direction={{ md: "row" }}
        alignItems={"center"}
        justifyContent={"end"}
      >
        <Paper
          component={motion.div}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { delay: 0.2 } }}
          elevation={0}
          sx={{
            gap: "0.5em",
            px: "1em",
            py: "0.2em",
            borderRadius: "20px",
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon color="disabled" />
          <Input
            placeholder="Поиск городов"
            sx={{
              display: "flex",
              flexGrow: 1,
            }}
            disableUnderline
            fullWidth
            onChange={onSearch}
            inputProps={{
              "aria-label": "Search",
            }}
          />
        </Paper>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.2 } }}
        >
          <Button
            sx={{
              fontWeight: 600,
              boxShadow: "unset",
              borderRadius: "20px",
              py: "0.6em",
            }}
            component={Link}
            href="/administration/cities/new"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Создать
          </Button>
        </motion.div>
      </Stack>
    </Stack>
  );
};

export default CitiesHeader;
