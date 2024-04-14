import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { motion } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";
import { useTranslation } from "next-i18next";

const TermsOfUse = () => {
  const { t } = useTranslation("terms");
  const textLists = {
    block1: [t("block1.item1"), t("block1.item2"), t("block1.item3")],
    block2: [
      t("block2.item1"),
      t("block2.item2"),
      t("block2.item3"),
      t("block2.item4"),
      t("block2.item5"),
      t("block2.item6"),
      t("block2.item7"),
      t("block2.item8"),
    ],
    block3: [
      t("block3.item1"),
      t("block3.item2"),
      t("block3.item3"),
      t("block3.item4"),
      t("block3.item5"),
    ],
    block4: [
      t("block4.item1"),
      t("block4.item2"),
      t("block4.item3"),
      t("block4.item4"),
      t("block4.item5"),
    ],
    block5: [t("block5.item1"), t("block5.item2"), t("block5.item3")],
    responsibility: [
      t("responsibility.item1"),
      t("responsibility.item2"),
      t("responsibility.item3"),
      t("responsibility.item4"),
    ],
  };

  return (
    <WrappedContainer>
      <Breadcrumbs />
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          type: "spring",
        }}
      >
        <Stack
          gap={"1.5em"}
          mt={"1em"}
          mb={"3em"}
          sx={{
            ul: {
              mt: "0.5em",
            },
            ".text-li": {
              marginInlineStart: "1em",
            },
          }}
        >
          <Box>
            <Typography variant={"h1"} component={"h1"}>
              {t("title")}
            </Typography>
            <Typography variant={"body1"} fontSize={"18px"}>
              {t("description")}
            </Typography>
            <br />
            <Typography variant={"body1"} fontSize={"18px"}>
              {t("agreement1")}
            </Typography>
            <Typography variant={"body1"} fontWeight={600} fontSize={"18px"}>
              {t("agreement2")}
            </Typography>
          </Box>
          <Box>
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              {t("subject")}
            </Typography>
            <Typography variant={"body1"} fontWeight={600}>
              {t("block1.title")}
            </Typography>
            <ul>
              {textLists.block1.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Typography variant={"body1"} fontWeight={600}>
              {t("block2.title")}
            </Typography>
            <ul>
              {textLists.block2.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
            <br />
            <Typography variant={"body1"} fontWeight={600}>
              {t("block3.title")}
            </Typography>
            <ul>
              {textLists.block3.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
            <br />
            <Typography variant={"body1"} fontWeight={600}>
              {t("block4.title")}
            </Typography>
            <ul>
              {textLists.block4.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
            <br />
            <Typography variant={"body1"} fontWeight={600}>
              {t("block5.title")}
            </Typography>
            <ul>
              {textLists.block5.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              {t("responsibility.title")}
            </Typography>
            <ul>
              {textLists.responsibility.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              {t("termsOfAgreement.title")}
            </Typography>
            <Typography variant={"body2"}>
              {t("termsOfAgreement.item1")}
              <br />
              {t("termsOfAgreement.item2")}
              <br />
              {t("termsOfAgreement.item3")}
              <br />
              {t("termsOfAgreement.item4")}
            </Typography>
          </Box>
        </Stack>
      </motion.div>
    </WrappedContainer>
  );
};

export default TermsOfUse;
