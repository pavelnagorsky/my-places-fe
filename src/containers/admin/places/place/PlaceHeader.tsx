import { Box, Stack, Typography } from "@mui/material";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { motion } from "framer-motion";
import Link from "next/link";
import { routerLinks } from "@/routing/routerLinks";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import PlaceIcon from "@mui/icons-material/Place";

const PlaceHeader = ({ title }: { title?: string }) => {
  return (
    <Stack
      gap={"1em"}
      direction={{ sm: "row" }}
      width={"100%"}
      alignItems={"center"}
      justifyContent={"space-between"}
      bgcolor={primaryBackground}
      px={{ xs: "1em", lg: "2em" }}
      py={"1em"}
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
            href={routerLinks.administrationPlaces}
            color="inherit"
          >
            <KeyboardBackspaceIcon />
            <Box component={"span"} mx={"0.2em"}>
              Список мест
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
            <PlaceIcon fontSize={"large"} />
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
              {title || ""}
            </Typography>
            <Typography variant="caption" fontSize={"12px"} fontWeight={500}>
              Информация о месте
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
        ></Box>
      </Stack>
    </Stack>
  );
};

export default PlaceHeader;
