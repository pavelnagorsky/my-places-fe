import { Stack, Typography } from "@mui/material";

const Details = () => {
  return (
    <Stack
      zIndex={1}
      position={{ md: "sticky" }}
      top={{ md: "5.5em" }}
      gap={1}
      borderRadius={"15px"}
      bgcolor={"primary.main"}
      p={"1em"}
      color={"white"}
    >
      <Typography fontWeight={600} fontSize={"22px"} gutterBottom>
        Детали вашей поездки
      </Typography>
      <Typography fontWeight={500} fontSize={"18px"}>
        Время в пути:
      </Typography>
      <Typography fontWeight={600} fontSize={"40px"}>
        18ч 32мин
      </Typography>
      <Typography fontWeight={500} fontSize={"18px"}>
        Километраж:
      </Typography>
      <Typography fontWeight={600} fontSize={"40px"}>
        1600 км
      </Typography>
    </Stack>
  );
};

export default Details;
