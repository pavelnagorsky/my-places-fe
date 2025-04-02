import { SelectElement, SelectElementProps } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import useDateFnsLocale from "@/hooks/useDateFnsLocale";
import { useMemo } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { formatDuration, intervalToDuration } from "date-fns";

interface IDurationPickerProps extends Omit<SelectElementProps, "options"> {}

const generateTimeIntervals = (intervalMinutes: number, locale: any) => {
  const opts = [];
  for (let hours = 0; hours < 24; hours++) {
    const isFirstHour = hours === 0;
    for (
      let minutes = isFirstHour ? intervalMinutes : 0;
      minutes < 60;
      minutes += intervalMinutes
    ) {
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      const startTime = new Date();
      startTime.setHours(0, 0, 0, 0); // Set start time to today's date at 00:00
      const duration = intervalToDuration({ start: startTime, end: date });
      const formattedDuration = formatDuration(duration, {
        locale,
        format: ["hours", "minutes"],
        zero: true,
      });
      const id = hours * 60 + minutes; // Unique numeric ID
      const label = formattedDuration;
      opts.push({ id, label });
    }
  }
  return opts;
};

const DurationPicker = ({ slotProps, sx, ...props }: IDurationPickerProps) => {
  const { i18n } = useTranslation();
  const locale = useDateFnsLocale();
  const options = useMemo(() => {
    return generateTimeIntervals(15, locale);
  }, [i18n.language]);

  return (
    <SelectElement
      {...props}
      options={options}
      sx={{
        ...sx,
        "& .MuiSelect-select": {
          pr: "38px !important",
        },
      }}
      slotProps={{
        ...slotProps,
        select: {
          ...slotProps?.select,
          MenuProps: { slotProps: { paper: { sx: { maxHeight: "300px" } } } },
          IconComponent: AccessTimeIcon,
        },
      }}
    />
  );
};

export default DurationPicker;
