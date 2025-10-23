import { Button, CircularProgress } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsEditingMode,
  selectItems,
  selectSubmitLoading,
} from "@/store/excursion-builder-slice/excursion-builder.slice";
import { useFormState } from "react-hook-form-mui";
import { useTranslation } from "next-i18next";
import { IEditExcursionForm } from "@/containers/personal-area/my-excursions/edit-excursion/logic/interfaces";
import useExcursionBuilderSubmit from "@/containers/excursion-builder/content/form/logic/useExcursionBuilderSubmit";

const SubmitButton = () => {
  const { t, i18n } = useTranslation(["excursion-management", "common"]);
  const loading = useAppSelector(selectSubmitLoading);
  const isEditMode = useAppSelector(selectIsEditingMode);
  const items = useAppSelector(selectItems);
  const { isValid } = useFormState<IEditExcursionForm>();
  const onSubmit = useExcursionBuilderSubmit();

  return (
    <Button
      disabled={!isValid || items.length < 2}
      variant={"contained"}
      size={"large"}
      endIcon={loading && <CircularProgress color="inherit" size={22} />}
      onClick={onSubmit}
    >
      {isEditMode ? t("updateExcursion") : t("createExcursion")}
    </Button>
  );
};

export default SubmitButton;
