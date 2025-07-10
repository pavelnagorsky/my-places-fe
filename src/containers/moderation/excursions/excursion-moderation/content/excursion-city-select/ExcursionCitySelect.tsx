import {
  Box,
  Button,
  createFilterOptions,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  SxProps,
  Typography,
} from "@mui/material";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useFormContext,
} from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { ISelect } from "@/shared/interfaces";
import useDialog from "@/hooks/useDialog";
import useCities from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/logic/useCities";
import useNewCityForm from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/logic/useNewCityForm";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import NewCityForm from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/content/NewCityForm";
import parseLanguageToId from "@/shared/parseLanguageToId";
import useNewCityFormSubmit from "@/containers/moderation/excursions/excursion-moderation/content/excursion-city-select/logic/useNewCityFormSubmit";
import { IModerationFormContext } from "@/containers/moderation/places/place-moderation/ModerationForm";

const filter = createFilterOptions<ISelect & { customTitle: string }>();

const ExcursionCitySelect = ({
  sx,
  fieldName,
}: {
  sx?: SxProps;
  fieldName: string;
}) => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const { cities, loading, fetchCities } = useCities();
  const newCityDialog = useDialog();
  const newCityForm = useNewCityForm();
  const formIsValid = newCityForm.formState.isValid;
  const { setValue } = useFormContext();

  const handleCloseNewCity = () => {
    newCityDialog.handleClose();
    newCityForm.reset();
  };

  const handleAddNewCity = (newValue: ISelect) => {
    newCityDialog.handleOpen();
    const defaultValues = newCityForm.getValues();
    newCityForm.setValue(
      "titleTranslations",
      defaultValues.titleTranslations.map((tr) => {
        if (tr.langId === parseLanguageToId(i18n.language)) {
          return { ...tr, text: newValue?.label || "" };
        } else {
          return tr;
        }
      })
    );
  };

  const { onSubmit, submitLoading } = useNewCityFormSubmit({
    onSuccess: (option) => {
      setValue(fieldName, option);
      handleCloseNewCity();
      fetchCities();
    },
  });

  return (
    <Box sx={sx}>
      <Typography
        className={"excursion-city-label"}
        variant={"body1"}
        mb={"0.5em"}
        fontSize={{ xs: "14px", md: "20px" }}
      >
        {t("form.excursionCity")}
      </Typography>
      <AutocompleteElement
        loading={loading}
        options={cities}
        required
        textFieldProps={{ placeholder: t("form.excursionCityPlaceholder") }}
        name={fieldName}
        autocompleteProps={{
          fullWidth: true,
          id: fieldName,
          filterOptions: (options, params) => {
            const filtered = filter(options as any, params);

            if (params.inputValue !== "") {
              filtered.push({
                id: null as any,
                label: params.inputValue,
                customTitle: `${t("common:buttons.add")} "${
                  params.inputValue
                }"`,
              });
            }

            return filtered;
          },

          getOptionLabel: (option: any) => {
            if (option.customTitle) return option.customTitle;
            return option.label;
          },

          onChange: (event, newValue) => {
            if (!!newValue && !newValue?.id) {
              // timeout to avoid instant validation of the dialog's form.
              setTimeout(() => {
                handleAddNewCity(newValue);
              });
            }
          },
        }}
        parseError={() => t("errors.required", { ns: "common" })}
      />
      <Dialog
        slotProps={{
          paper: {
            sx: { p: 1, borderRadius: "10px" },
          },
        }}
        open={newCityDialog.open}
        onClose={handleCloseNewCity}
      >
        <FormContainer formContext={newCityForm} onSuccess={onSubmit}>
          <DialogTitle fontSize={20}>{t("form.addNewCity")}</DialogTitle>
          <DialogContent>
            <NewCityForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseNewCity} color={"secondary"}>
              {t("common:buttons.cancel")}
            </Button>
            <Button
              type={"submit"}
              color="primary"
              disabled={!formIsValid}
              loading={submitLoading}
            >
              {t("common:buttons.add")}
            </Button>
          </DialogActions>
        </FormContainer>
      </Dialog>
    </Box>
  );
};

export default ExcursionCitySelect;
