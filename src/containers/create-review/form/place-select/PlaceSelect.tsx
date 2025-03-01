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
import { useAppSelector } from "@/store/hooks";
import { selectIsAuth } from "@/store/user-slice/user.slice";

interface IPlaceSelectProps {
  readonly fieldName: string;
  readonly?: boolean;
  required?: boolean;
  excludeId?: number;
}

const PlaceSelect = ({
  fieldName,
  readonly,
  required,
  excludeId,
}: IPlaceSelectProps) => {
  const { t, i18n } = useTranslation(["review-management", "common"]);
  const router = useRouter();
  const { setValue } = useFormContext();
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
    setValue(fieldName, place || null);
    setAlreadySelectedPlaceId(true);
  }, [query.placeId, options, fieldName]);

  const fetch = (value: string) =>
    placesService
      .getPlacesSelect(i18n.language, value, query.placeId)
      .then(({ data }) => {
        setOptions(data.filter((p) => p.id !== excludeId));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

  useEffect(() => {
    if (!isAuth) return;
    fetch("");
  }, [i18n.language, query.placeId, isAuth]);

  const debouncedInputChange = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        fetch(event.target.value);
      }, 300),
    [i18n.language]
  );

  return (
    <AutocompleteElement
      rules={{
        required: required,
      }}
      parseError={(error) => t("errors.required", { ns: "common" })}
      name={fieldName}
      loading={loading}
      options={options}
      textFieldProps={{
        placeholder: t("form.selectPlace"),
        fullWidth: true,
        sx: {
          minWidth: { sm: "300px", md: "350px" },
          "& .MuiInputBase-root": { bgcolor: "white" },
        },
        onChange: debouncedInputChange,
      }}
      autocompleteProps={{
        readOnly: readonly,
        getOptionLabel: (opt) => opt.title,
        filterOptions: (x) => x,
      }}
    />
  );
};

export default memo(PlaceSelect);
