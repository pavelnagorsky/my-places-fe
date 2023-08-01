import { Box, Breadcrumbs as Crumbs, Typography } from "@mui/material";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";
import { useRouter } from "next/router";
import { memo } from "react";

type routesNames = "create-review";

const Breadcrumbs = () => {
  const router = useRouter();
  const pathnames = router.asPath.split("/").filter((x) => x);

  // possible pathnames
  const breadcrumbNameMap = {
    ["create-review"]: "Создание заметки",
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
