import { ChangeEvent, Fragment, memo, useRef, useState } from "react";
import SortableList, { SortableItem } from "react-easy-sort";
import { useFieldArray, useFormContext } from "react-hook-form-mui";
import { IImage } from "@/services/file-service/image.interface";
import { Box, Button, CircularProgress, Input, Stack } from "@mui/material";
import uploadIcon from "/public/images/icons/upload.png";
import Image from "next/image";
import { primaryBackground } from "@/styles/theme/lightTheme";
import fileService from "@/services/file-service/file.service";
import ImagePreview from "@/components/Forms/ImageUploader/ImagePreview";

const ImageUploader = ({ fieldName }: { fieldName: string }) => {
  const [loading, setLoading] = useState(false);
  const { control } = useFormContext<{ [T in typeof fieldName]: IImage[] }>();
  const { fields, move, append, remove } = useFieldArray({
    control: control,
    name: fieldName,
    keyName: "key",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    move(oldIndex, newIndex);
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files?.length === 0) return;
    const promises: Promise<any>[] = [];
    for (let i = 0; i <= event.target.files.length; i++) {
      if (!event.target.files[i]) break;
      promises.push(
        fileService
          .uploadImage(event.target.files[i])
          .then(({ data }) => {
            append(data);
          })
          .catch(() => {})
      );
      setLoading(true);
      Promise.all(promises)
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  };

  const handleDelete = (index: number) => {
    remove(index);
  };

  return (
    <SortableList onSortEnd={onSortEnd} draggedItemClassName="dragged">
      <Stack direction={"row"} flexWrap={"wrap"} gap={"2em"}>
        <label htmlFor="file-input">
          <Button
            disabled={loading}
            onClick={() => fileInputRef.current && fileInputRef.current.click()}
            variant={"text"}
            sx={{
              position: "relative",
              ":hover": {
                bgcolor: "primary.light",
              },
              width: { xs: "160px", md: "170px" },
              height: { xs: "160px", md: "170px" },
              bgcolor: primaryBackground,
              borderRadius: "15px",
              boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <input
              onChange={handleUpload}
              ref={fileInputRef}
              hidden
              disabled={loading}
              id={"file-input"}
              type={"file"}
              accept={"image/*"}
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
              <ImagePreview image={item} onDelete={() => handleDelete(index)} />
            </Box>
          </SortableItem>
        ))}
      </Stack>
    </SortableList>
  );
};

export default memo(ImageUploader);
