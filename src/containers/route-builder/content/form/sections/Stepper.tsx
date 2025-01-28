import { useAppSelector } from "@/store/hooks";
import {
  selectHasRouteDirections,
  selectItems,
} from "@/store/route-builder-slice/route-builder.slice";
import { Box, Stack, SxProps, Typography } from "@mui/material";
import { Fragment, PropsWithChildren } from "react";
import { primaryBackground } from "@/styles/theme/lightTheme";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useFormContext } from "react-hook-form-mui";
import { IRouteBuilderForm } from "@/containers/route-builder/content/form/logic/interfaces";
import { addMinutes, format } from "date-fns";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";

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

const DashedLineHorizontal = ({ sx }: { sx?: SxProps }) => (
  <Box
    sx={{
      height: 2,
      width: "0.7em",
      borderBottom: "1.5px dashed #FF7A00",
      ...sx,
    }}
  />
);

const Stepper = () => {
  const items = useAppSelector(selectItems);
  const { watch } = useFormContext<IRouteBuilderForm>();
  const hasDirections = useAppSelector(selectHasRouteDirections);
  const timeStart = watch("time");
  const dateFnsLocale = useDateFnsLocale();

  return (
    <Stack alignItems={"center"} py={{ xs: "80px" }}>
      <PrimaryCircle>
        <Typography fontWeight={"700"} fontSize={"30px"} pt={"10px"}>
          *
        </Typography>
      </PrimaryCircle>
      <DashedLine sx={{ height: { xs: "120px", sm: "80px" } }} />
      <PrimaryCircle>
        <AccessTimeIcon />
      </PrimaryCircle>
      {items.length > 0 && (
        <DashedLine sx={{ height: { xs: "140px", sm: "100px" } }} />
      )}
      {items.map((item, i) => {
        const showTime = !!timeStart && hasDirections;
        const prevItems = items.slice(0, i + 1);
        let itemTotalTime = timeStart || new Date();
        prevItems.forEach((prevItem) => {
          itemTotalTime = addMinutes(itemTotalTime, prevItem.duration);
        });

        return (
          <Fragment key={item.id}>
            <Stack direction={"row"} alignItems={"center"}>
              {showTime && (
                <Typography
                  sx={{
                    marginInlineStart: "-5.5em",
                    border: 1,
                    borderRadius: "8px",
                    py: "0.5em",
                    px: "1em",
                    borderColor: "primary.main",
                    color: "primary.main",
                    fontWeight: 500,
                  }}
                >
                  {format(itemTotalTime, "HH:mm", { locale: dateFnsLocale })}
                </Typography>
              )}
              {showTime && <DashedLineHorizontal />}
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
