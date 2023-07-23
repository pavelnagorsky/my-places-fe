import { Box, Stack } from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

interface IMyStepperProps {
  totalOptions: number;
  activeOption: number;
}

const MyStepper = ({ activeOption, totalOptions }: IMyStepperProps) => {
  const steps = new Array(totalOptions).fill(1);

  return (
    <Stack direction={"row"}>
      {steps.map((_, i) => (
        <Box display="flex" alignItems={"center"} key={i}>
          {i + 1 === activeOption ? (
            <RadioButtonCheckedIcon sx={{ mx: "-2px" }} color={"primary"} />
          ) : (
            <RadioButtonUncheckedIcon sx={{ mx: "-2px" }} color={"primary"} />
          )}
          <Box
            borderBottom={"2px solid rgba(255, 122, 0, 1)"}
            height="1px"
            width="5px"
            display={i >= steps.length - 1 ? "none" : "block"}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default MyStepper;
