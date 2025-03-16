import { Box, Breadcrumbs as Crumbs, Typography } from "@mui/material";
import NextMuiLink from "@/components/next-mui-link/NextMuiLink";
import { useRouter } from "next/router";
import { memo } from "react";
import { useTranslation } from "next-i18next";

type routesNames = "create-review" | "create-place";

const Breadcrumbs = ({ customEnding }: { customEnding?: string }) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);

  // possible pathnames
  const breadcrumbNameMap = {
    ["create-review"]: t("links.createReview"),
    ["create-place"]: t("links.createPlace"),
    ["create-route"]: t("links.createRoute"),
    ["create-excursion"]: t("links.createExcursion"),
    ["privacy-policy"]: t("links.privacyPolicy"),
    ["terms-of-use"]: t("links.termsOfUse"),
  };

  return (
    <Box role="presentation">
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
