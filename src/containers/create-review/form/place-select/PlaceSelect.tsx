import {
  ChangeEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { debounce } from "@mui/material";
import ISelectPlace from "@/services/places-service/interfaces/select-place.interface";
import placesService from "@/services/places-service/places.service";
import { useTranslation } from "next-i18next";
import { AutocompleteElement, useFormContext } from "react-hook-form-mui";
import { useRouter } from "next/router";
import { IReviewFormContext } from "@/containers/create-review/form/interfaces";
import { useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user-slice/user.slice";

interface IPlaceSelectProps {
  readonly fieldName: string;
}

const PlaceSelect = ({ fieldName }: IPlaceSelectProps) => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { setValue } = useFormContext<IReviewFormContext>();
  const [options, setOptions] = useState<ISelectPlace[]>([]);
  const [loading, setLoading] = useState(false);
  const [alreadySelectedPlaceId, setAlreadySelectedPlaceId] = useState(false);
  const query = router.query as { placeId?: string };
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    if (!query.placeId || alreadySelectedPlaceId) return;
    const placeId = +query.placeId;
    if (options.length === 0) return;
    const place = options.find((p) => p.id === placeId);
    setValue("place", place || null);
    setAlreadySelectedPlaceId(true);
  }, [query.placeId, options]);

  const fetch = (value: string) =>
    placesService
      .getPlacesSelect(i18n.language, value, query.placeId)
      .then(({ data }) => {
        setOptions(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  useEffect(() => {
    if (!isAuth) return;
    fetch("");
  }, [i18n.language, query.placeId, isAuth]);

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    fetch(event.target.value);
  }, []);

  const debouncedInputChange = useMemo(
    () => debounce(onInputChange, 300),
    [onInputChange]
  );

  return (
    <AutocompleteElement
      rules={{
        required: true,
        minLength: 15,
      }}
      parseError={(error) => "Поле обязательно к заполнению"}
      name={fieldName}
      loading={loading}
      options={options}
      textFieldProps={{
        placeholder: "Выберите место",
        fullWidth: true,
        sx: {
          minWidth: "350px",
          "& .MuiInputBase-root": { bgcolor: "white" },
        },
        onChange: debouncedInputChange,
      }}
      autocompleteProps={{
        getOptionLabel: (opt) => opt.title,
        filterOptions: (x) => x,
      }}
    />
  );
};

export default memo(PlaceSelect);
