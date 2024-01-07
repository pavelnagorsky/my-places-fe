import { Box, Breadcrumbs as Crumbs, Typography } from "@mui/material";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";
import { useRouter } from "next/router";
import { memo } from "react";

type routesNames = "create-review" | "create-place";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);

  // possible pathnames
  const breadcrumbNameMap = {
    ["create-review"]: "Создание заметки",
    ["create-place"]: "Создание места",
    ["privacy-policy"]: "Политика Конфиденциальности",
    ["terms-of-use"]: "Пользовательское Соглашение",
  };

  return (
    <Box role="presentation" mt={"1em"}>
      <Crumbs aria-label="breadcrumb">
        <NextMuiLink underline="hover" color="inherit" href="/">
          Знай свой край
        </NextMuiLink>
        {pathnames.map((path, i) => {
          if (breadcrumbNameMap.hasOwnProperty(path)) {
            const pathName = breadcrumbNameMap[path as routesNames];
            return i < pathnames.length - 1 ? (
              <NextMuiLink
                color="primary.main"
                key={i}
                href={"/" + path}
                underline="hover"
              >
                {pathName}
              </NextMuiLink>
            ) : (
              <Typography key={i} color="text.primary">
                {pathName}
              </Typography>
            );
          } else {
            return null;
          }
        })}
      </Crumbs>
    </Box>
  );
};

export default memo(Breadcrumbs);
