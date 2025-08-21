import { ChangeEvent, memo, useRef, useState } from "react";
import { SortableItem } from "react-easy-sort";
import { useFieldArray, useFormContext } from "react-hook-form-mui";
import { IImage } from "@/services/file-service/image.interface";
import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Input,
  Stack,
} from "@mui/material";
import uploadIcon from "/public/images/icons/upload.png";
import Image from "next/image";
import { primaryBackground } from "@/styles/theme/lightTheme";
import fileService from "@/services/file-service/file.service";
import dynamic from "next/dynamic";
import { AxiosResponse } from "axios";
import FilePreview from "@/components/forms/file-uploader/content/FilePreview";
import { useTranslation } from "next-i18next";

const SortableList = dynamic(() => import("react-easy-sort"), { ssr: false });

interface IFileUploaderProps {
  fieldName: string;
  required?: boolean;
  maxLimit?: number;
  readonly?: boolean;
  accept?: string;
  canDeleteByAPI?: boolean;
  customUploadApi?: (file: File) => any;
  customDeleteApi?: (id: number) => any;
}

const FileUploader = ({
  fieldName,
  maxLimit,
  required,
  readonly,
  accept,
  canDeleteByAPI,
  customDeleteApi,
  customUploadApi,
}: IFileUploaderProps) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const uploadApi = customUploadApi || fileService.uploadImage;
  const deleteApi = customDeleteApi || fileService.deleteImage;
  const { control, formState } =
    useFormContext<{ [T in typeof fieldName]: IImage[] }>();
  const { fields, move, append, remove } = useFieldArray({
    control: control,
    name: fieldName,
    keyName: "key",
    rules: {
      required: required ? t("errors.required") : undefined,
      maxLength: maxLimit
        ? {
            value: maxLimit,
            message: t("errors.imagesLimit"),
          }
        : undefined,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length === 0) return;
    const promises: Promise<AxiosResponse<IImage, any>>[] = [];
    for (let i = 0; i <= event.target.files.length; i++) {
      if (!event.target.files[i]) break;
      promises.push(uploadApi(event.target.files[i]));
    }
    setLoading(true);
    Promise.all(promises)
      .then((array) => {
        append(array.map((res) => res.data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = (index: number) => {
    if (canDeleteByAPI && fields[index]?.id) {
      deleteApi(fields[index].id).catch(() => {});
    }
    remove(index);
  };

  return (
    <SortableList
      allowDrag={!readonly}
      onSortEnd={onSortEnd}
      draggedItemClassName="dragged"
    >
      <Stack direction={"row"} flexWrap={"wrap"} gap={{ xs: "1em", md: "2em" }}>
        <label htmlFor="file-input">
          <Button
            disabled={loading || readonly}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            variant={"text"}
            sx={{
              position: "relative",
              ":hover": {
                bgcolor: "primary.light",
              },
              width: { xs: "150px", md: "170px" },
              height: { xs: "150px", md: "170px" },
              bgcolor: primaryBackground,
              borderRadius: "15px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <input
              onChange={handleUpload}
              ref={fileInputRef}
              hidden
              disabled={loading || readonly}
              id={"file-input"}
              type={"file"}
              accept={accept}
              multiple
            />
            {loading ? (
              <CircularProgress size={45} />
            ) : (
              <Image
                style={{ position: "absolute" }}
                src={uploadIcon}
                draggable={false}
                alt={"upload"}
                priority
                height={40}
                width={40}
              />
            )}
          </Button>
        </label>
        {fields.map((item, index) => (
          <SortableItem key={item.key}>
            <Box
              position={"relative"}
              sx={{
                "&.dragged div": {
                  boxShadow:
                    "0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
                },
                borderRadius: "15px",
                userSelect: "none",
                cursor: "grab",
              }}
            >
              <FilePreview
                readonly={readonly}
                file={item}
                onDelete={() => handleDelete(index)}
              />
            </Box>
          </SortableItem>
        ))}
      </Stack>
      {formState.errors[fieldName] && (
        <FormHelperText error sx={{ mt: "1.5em" }}>
          {formState.errors[fieldName]?.root?.message}
        </FormHelperText>
      )}
    </SortableList>
  );
};

export default memo(FileUploader);
