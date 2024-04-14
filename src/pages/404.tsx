import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import I18nLanguages from "@/shared/I18nLanguages";
import { Box, Stack, Typography } from "@mui/material";
import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import Image from "next/image";
import image from "/public/images/404/404.png";
import { Button } from "@/components/UI/button/Button";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Fragment } from "react";
import { NextSeo } from "next-seo";

const NotFound = () => {
  const router = useRouter();
  const { t } = useTranslation("404");

  const onClickBack = () => router.back();

  return (
    <Fragment>
      <NextSeo title={"404"} description={t("title")} />
      <motion.div
        variants={animationVariants.defaultContainerVariant}
        initial="hidden"
        animate="show"
      >
        <Stack
          flexGrow={1}
          sx={{
            height: "100vh",
            width: "100%",
            position: "fixed",
          }}
        >
          <Image
            priority
            quality={100}
            src={image}
            alt={"404"}
            fill
            style={{
              objectFit: "cover",
              filter: "blur(1px)",
            }}
            sizes={"100vw"}
          />
          <Stack alignItems={"center"} justifyContent={"center"} flexGrow={1}>
            <motion.div variants={animationVariants.defaultItemVariant}>
              <Stack
                zIndex={3}
                position={"relative"}
                color={"white"}
                mt={"-7em"}
                textAlign={"center"}
              >
                <Typography
                  fontSize={{ xs: "150px", md: "230px" }}
                  fontWeight={700}
                  sx={{ opacity: 0.8 }}
                >
                  404
                </Typography>
                <Typography
                  fontSize={{ xs: "18px", md: "24px" }}
                  fontWeight={500}
                >
                  {t("title")}
                </Typography>
                <Stack alignItems={"center"} mt={"2em"}>
                  <Button
                    onClick={onClickBack}
                    sx={{
                      background: "white",
                      "&:hover": {
                        background: "#bfbfbf",
                      },
                      fontWeight: 700,
                      py: "1em",
                      color: "black",
                    }}
                    variant={"contained"}
                  >
                    {t("button")}
                  </Button>
                </Stack>
              </Stack>
            </motion.div>
          </Stack>
        </Stack>
      </motion.div>
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? I18nLanguages.ru, [
        "common",
        "404",
      ])),
      // Will be passed to the page component as props
    },
  };
};

export default NotFound;
