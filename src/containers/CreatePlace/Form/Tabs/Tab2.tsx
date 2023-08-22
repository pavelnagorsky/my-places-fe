import { Fragment, memo, useEffect, useState } from "react";
import { Box, IconButton, Stack, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { CheckboxButtonGroup, SelectElement } from "react-hook-form-mui";
import { IPlaceType } from "@/services/place-types-service/place-type.interface";
import { useTranslation } from "next-i18next";
import placeTypesService from "@/services/place-types-service/place-types.service";
import { IPlaceCategory } from "@/services/place-categories-service/place-category.interface";
import placeCategoriesService from "@/services/place-categories-service/place-categories.service";

interface ITab2Props {
  placeTypes: IPlaceType[];
  categories: IPlaceCategory[];
}

const Tab2 = ({ placeTypes, categories }: ITab2Props) => {
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
      <Typography variant={"body1"} fontSize={{ xs: "18px", md: "20px" }}>
        Выберите тип места
      </Typography>
      <SelectElement
        name={"placeTypeId"}
        validation={{
          required: "Это поле обязательно к заполнению",
        }}
        sx={{
          mt: "1em",
        }}
        options={placeTypes.map((opt) => ({ id: opt.id, label: opt.title }))}
        fullWidth
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
        mb="2.5em"
        sx={{
          "& .MuiFormControl-root": {
            width: "100%",
          },
        }}
      >
        <CheckboxButtonGroup
          labelProps={{
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
          name={"categoriesIds"}
        />
      </Box>
    </Fragment>
  );
};

export default memo(Tab2);
