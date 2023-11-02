import { Card, Stack, Typography } from "@mui/material";
import { Button } from "@/components/UI/Button/Button";

const NoReviews = ({ link }: { link: string }) => {
  return (
    <Card
      sx={{
        px: "1em",
        py: "1.5em",
        borderRadius: "10px",
        boxShadow: "2px 2px 15px 2px rgba(0, 0, 0, 0.20)",
        border: "0.5px solid #FF7900",
        position: "relative",
      }}
    >
      <Typography fontSize={"18px"} mb={"0.5em"} fontWeight={600}>
        Заметок еще нету, создайте первую!
      </Typography>
      <Typography variant={"body2"} mb={"1.5em"}>
        Заметка - рецензия или авторская экскурсия по месту, которая позволяет
        подробно описать все детали
      </Typography>
      <Stack direction={"row"} justifyContent={"center"}>
        <Button
          sx={{
            width: "100%",
            maxWidth: "400px",
            px: 0,
            fontSize: { xs: "14px", lg: "16px" },
          }}
          linkTo={link}
          variant={"contained"}
        >
          Создать заметку
        </Button>
      </Stack>
    </Card>
  );
};

export default NoReviews;
