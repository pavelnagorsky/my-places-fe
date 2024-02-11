import { Box, Stack, Typography } from "@mui/material";
import { Button } from "@/components/UI/button/Button";
import { routerLinks } from "@/routing/routerLinks";
import { Environment } from "@/shared/Environment";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const InfoPanel = () => {
  return (
    <Stack gap={{ xs: "2em", md: "2em" }}>
      <Box>
        <Typography
          component={"h2"}
          fontWeight={600}
          fontSize={{ xs: "20px", md: "30px" }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          О проекте
        </Typography>
        <Typography
          variant={"body2"}
          mt={"0.5em"}
          mb={"1em"}
          fontSize={{ xs: "16px", md: "20px" }}
        >
          Прочитайте о нашем проекте подробнее:
        </Typography>
        <Button
          sx={{ py: "0.8em", color: "primary.main" }}
          variant={"outlined"}
          linkTo={routerLinks.aboutUs}
        >
          О проекте
        </Button>
      </Box>
      <Box>
        <Typography
          component={"h2"}
          fontWeight={600}
          fontSize={{ xs: "20px", md: "30px" }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          Напишите нам
        </Typography>
        <Typography
          variant={"body2"}
          mt={"0.5em"}
          mb={"1em"}
          fontSize={{ xs: "16px", md: "20px" }}
        >
          Не нашли ответ на свой вопрос? Задайте его напрямую через почту:
        </Typography>
        <Stack direction={"row"} alignItems={"center"}>
          <MailOutlineIcon
            color={"primary"}
            sx={({ palette }) => ({
              borderRadius: "50%",
              p: "0.1em",
              border: `1px solid ${palette.primary.main}`,
            })}
          />
          <Typography
            component={"a"}
            href={`mailto:${Environment.email}`}
            color={"primary.main"}
            fontWeight={500}
            ml={"0.3em"}
            fontSize={{ xs: "16px", md: "18px" }}
          >
            {Environment.email}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default InfoPanel;
