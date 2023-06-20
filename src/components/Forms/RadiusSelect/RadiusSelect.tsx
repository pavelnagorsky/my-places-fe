import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    InputAdornment,
    Slider,
    Stack,
    TextField,
} from "@mui/material";
import {ChangeEvent} from "react";

interface IRadiusSelectProps {
    readonly enabled: boolean,
    readonly setEnabled: (flag: boolean) => void,
    readonly value: number | string,
    readonly setValue: (v: number | string) => void,
    readonly maxValue: number
}

export function RadiusSelect({enabled, setEnabled, setValue, value, maxValue}: IRadiusSelectProps) {
    // checkbox logic

    const checkboxLabel = { inputProps: { 'aria-label': 'Radius enabled' } };
    const radiusCheckbox = (<Checkbox
        {...checkboxLabel}
        checked={enabled}
        onChange={(event, checked) => setEnabled(checked)}
    />);

    // slider logic

    function valueText(value: number) {
        return `${value} km`;
    }

    const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if (typeof newValue === "number") setValue(newValue);
    };

    // input logic

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > maxValue) {
            setValue(maxValue);
        }
    };

    return <Box>
        <FormGroup>
            <FormControlLabel
                control={radiusCheckbox}
                label="Поиск по радиусу"
            />
        </FormGroup>
        <Stack direction={"row"} gap={"1em"} alignItems={"start"}>
            <Box sx={{ width: 200 }}>
                <Slider
                    value={typeof value === 'number' ? value : 0}
                    onChange={handleSliderChange}
                    disabled={!enabled}
                    aria-label="search-distance"
                    getAriaValueText={valueText}
                    step={10}
                    max={maxValue}
                    valueLabelDisplay="auto"
                />
            </Box>
            <TextField
                disabled={!enabled}
                value={value}
                onChange={handleInputChange}
                onBlur={handleBlur}
                variant={"standard"}
                type={"number"}
                sx={{
                    maxWidth: "5em"
                }}
                InputProps={{
                    size: "small",
                    endAdornment: <InputAdornment position="end">km</InputAdornment>
                }}
                inputProps={{
                    step: 10,
                    min: 0,
                    max: maxValue,
                    'aria-labelledby': 'search-distance',
                }}
            />
        </Stack>
    </Box>
}