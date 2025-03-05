import { useAppSelector } from "@/store/hooks";
import { Box, Stack, SxProps } from "@mui/material";
import { Fragment } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import { selectItems } from "@/store/excursion-builder-slice/excursion-builder.slice";

const Circle = ({ index }: { index: number }) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"primary.main"}
    bgcolor={primaryBackground}
    fontWeight={"700"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {index + 1}
  </Stack>
);

const DashedLine = ({ sx }: { sx?: SxProps }) => (
  <Box
    sx={{
      width: 2,
      height: { xs: "190px", sm: "265px" },
      borderRight: "1.5px dashed #D4D4D4",
      my: "0.2em",
      ...sx,
    }}
  />
);

const Stepper = () => {
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} pt={{ xs: "170px" }}>
      {items.map((item, i) => {
        return (
          <Fragment key={item.id}>
            <Stack direction={"row"} alignItems={"center"}>
              <Circle index={i} />
            </Stack>
            {i !== items.length - 1 && <DashedLine />}
          </Fragment>
        );
      })}
    </Stack>
  );
};

export default Stepper;
