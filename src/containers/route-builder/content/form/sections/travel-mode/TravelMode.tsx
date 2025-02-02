import { RadioButtonGroup } from "react-hook-form-mui";
import useTravelModeOptions from "@/containers/route-builder/content/form/sections/travel-mode/useTravelModeOptions";

const TravelMode = () => {
  const options = useTravelModeOptions();
  return <RadioButtonGroup name="travelMode" row options={options} required />;
};

export default TravelMode;
