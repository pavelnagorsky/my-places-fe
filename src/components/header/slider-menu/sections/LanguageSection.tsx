import LanguageIcon from "@mui/icons-material/Language";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { useRouter } from "next/router";
import useLanguages from "@/hooks/useLanguages";

interface ILanguageSectionProps {
  onClose: () => void;
}

const LanguageSection = ({ onClose }: ILanguageSectionProps) => {
  const router = useRouter();
  const languages = useLanguages();

  const handleChangeLanguage = (event: SelectChangeEvent<string>) => {
    onClose();
    router.replace(
      { pathname: router.pathname, query: router.query },
      undefined,
      {
        locale: event.target.value,
      }
    );
  };

  return (
    <Stack
      direction={"row"}
      columnGap={"0.5em"}
      alignItems={"center"}
      p={"6px 8px"}
    >
      <LanguageIcon color={"primary"} />
      <Select
        sx={{
          "& svg": {
            fill: "#FF7A00",
          },
          color: "secondary.main",
        }}
        color={"primary"}
        disableUnderline
        variant={"standard"}
        id="language-select"
        value={router.locale}
        onChange={handleChangeLanguage}
      >
        {languages.map((l) => (
          <MenuItem key={l.locale} value={l.locale}>
            {l.label}
          </MenuItem>
        ))}
      </Select>
    </Stack>
  );
};

export default LanguageSection;
