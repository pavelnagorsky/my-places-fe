import { Fragment, memo, useMemo } from "react";
import {
  Box,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import {
  CheckboxButtonGroup,
  Controller,
  SelectElement,
  useFormContext,
} from "react-hook-form-mui";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import {
  IPlaceFormContext,
  IPlaceTabProps,
} from "@/containers/create-place/form/interfaces";

interface ITab2Props extends IPlaceTabProps {
  placeTypes: IPlaceType[];
  categories: IPlaceCategory[];
}

const Tab2 = ({ placeTypes, categories, readonly }: ITab2Props) => {
  const { watch, setValue } = useFormContext<IPlaceFormContext>();
  const isCommercial = watch("isCommercial");

  const filteredPlaceTypes = useMemo(() => {
    return placeTypes
      .filter((t) => {
        if (isCommercial) {
          return t.commercial;
        } else {
          return !t.commercial;
        }
      })
      .map((opt) => ({ id: opt.id, label: opt.title }));
  }, [isCommercial, placeTypes]);

  return (
    <Fragment>
      <Stack direction={"row"} gap={"0.5em"}>
        <Typography
          component={"h2"}
          fontSize={{ xs: "20px", md: "30px" }}
          fontWeight={{ xs: 500, md: 400 }}
          my={{ xs: "0.5em", md: "0.4em" }}
        >
          Тип и категории
        </Typography>
        <Tooltip
          arrow
          enterTouchDelay={0}
          leaveTouchDelay={6000}
          sx={{ fontSize: "16px", alignSelf: "center" }}
          title={
            <Typography p={"0.5em"}>
              Тип и категории нужны для корректного поиска вашего места на нашем
              сайте, вы всегда сможете изменить их в личном кабинете
            </Typography>
          }
        >
          <IconButton>
            <InfoOutlinedIcon fontSize={"medium"} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack mb={"1.5em"} mt={"0.5em"} maxWidth={{ lg: "70%" }}>
        <Stack
          direction={{ sm: "row" }}
          alignItems={{ sm: "center" }}
          gap={{ xs: "0.4em", sm: "1em" }}
        >
          <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
            Публикация на коммерческой основе
          </Typography>
          <Controller
            name={"isCommercial"}
            render={({ field, fieldState, formState }) => (
              <FormControlLabel
                control={
                  <Switch
                    {...field}
                    checked={!!field.value}
                    disabled={readonly}
                    onChange={(event, checked) => {
                      setValue("placeTypeId", "" as any);
                      field.onChange(checked);
                    }}
                  />
                }
                label={
                  <Box component={"span"} display={{ sm: "none" }}>
                    Рекламная публикация
                  </Box>
                }
              />
            )}
          />
        </Stack>
        <Typography
          variant={"body2"}
          mt={"0.5em"}
          fontSize={{ xs: "12px", md: "14px" }}
        >
          Для публикации на сайте коммерчески ориентированного объекта (усадьба,
          выставка, музей, гостиница и т.д.) в целях рекламы, выберите данную
          опцию.
        </Typography>
      </Stack>
      <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
        Выберите тип места
      </Typography>
      <SelectElement
        name={"placeTypeId"}
        SelectProps={{
          readOnly: readonly,
        }}
        validation={{
          required: "Это поле обязательно к заполнению",
        }}
        sx={{
          mt: "1em",
          width: { xs: "100%", md: "50%" },
        }}
        options={filteredPlaceTypes}
        placeholder={"Выберите тип места..."}
      />
      <Typography
        variant={"body1"}
        mt={"1em"}
        fontSize={{ xs: "18px", md: "20px" }}
      >
        Категории
      </Typography>
      <Typography variant={"body2"} mt={"0.5em"} fontSize={{ md: "16px" }}>
        Выберите категории к которым относится место
      </Typography>
      <Box
        width={"100%"}
        mt={"1em"}
        mb="3em"
        sx={{
          "& .MuiFormControl-root": {
            width: "100%",
          },
        }}
      >
        <CheckboxButtonGroup
          labelProps={{
            disabled: readonly,
            sx: {
              width: { xs: "49%", md: "40%", lg: "35%" },
              mx: 0,
              marginInlineEnd: "2px",
              "& span:first-of-type": {
                color: "primary.light",
                "&.Mui-checked": {
                  color: "primary.main",
                },
              },
            },
          }}
          row
          options={categories.map((opt) => ({
            id: opt.id,
            label: opt.title,
          }))}
          required={true}
          parseError={() => "Это поле обязательно к заполнению"}
          name={"categoriesIds"}
        />
      </Box>
    </Fragment>
  );
};

export default memo(Tab2);
