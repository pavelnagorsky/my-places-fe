import { useAppSelector } from "@/store/hooks";
import { selectItems } from "@/store/route-builder-slice/route-builder.slice";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { Fragment, PropsWithChildren } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import HomeIcon from "@mui/icons-material/Home";

const PrimaryCircle = ({ children }: PropsWithChildren) => (
  <Stack
    alignItems={"center"}
    justifyContent={"center"}
    color={"white"}
    bgcolor={"primary.main"}
    borderRadius={"50%"}
    width={"40px"}
    height={"40px"}
    minHeight={"40px"}
  >
    {children}
  </Stack>
);

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
      height: { xs: "190px", sm: "170px" },
      borderRight: "1.5px dashed #D4D4D4",
      my: "0.2em",
      ...sx,
    }}
  />
);

const Stepper = () => {
  const items = useAppSelector(selectItems);

  return (
    <Stack alignItems={"center"} py={{ xs: "80px" }}>
      <PrimaryCircle>
        <HomeIcon />
      </PrimaryCircle>
      {items.length > 0 && <DashedLine sx={{ height: { sm: "140px" } }} />}
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
