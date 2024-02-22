import { forwardRef, ReactElement, Ref } from "react";
import { TransitionProps } from "@mui/material/transitions/transition";
import { Slide } from "@mui/material";

const FilterTransition = forwardRef(function FilterTransition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default FilterTransition;
