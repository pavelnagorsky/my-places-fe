import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import Breadcrumbs from "@/components/breadcrumbs/Breadcrumbs";
import { motion } from "framer-motion";
import { Box, Stack, Typography } from "@mui/material";

const TermsOfUse = () => {
  const textLists = {
    block1: [
      "Текстовой информации",
      "Фотоматериалов",
      "Ссылок на материалы, размещенные на других сайтах",
    ],
    block2: [
      "осуществлять поиск информации на сайте",
      "получать информацию на сайте",
      "создавать информацию для сайта",
      "распространять информацию на сайте",
      "комментировать контент, выложенный на сайте",
      "копировать информацию на другие сайты с указанием источника",
      "использовать информацию сайта в личных некоммерческих целях",
      "использовать информацию сайта в коммерческих целях с разрешения правообладателей",
    ],
    block3: [
      "по своему усмотрению и необходимости создавать, изменять, отменять правила",
      "ограничивать доступ к любой информации на сайте",
      "создавать, изменять, удалять информацию",
      "удалять учетные записи",
      "отказывать в регистрации без объяснения причин",
    ],
    block4: [
      "обеспечить достоверность предоставляемой информации",
      "обеспечивать сохранность личных данных от доступа третьих лиц",
      "обновлять Персональные данные, предоставленные при регистрации, в случае их изменения",
      "не нарушать работоспособность сайта",
      "не совершать действия, направленные на введение других Пользователей в заблуждение",
    ],
    block5: [
      "поддерживать работоспособность сайта за исключением случаев, когда это невозможно по независящим от Администрации причинам.",
      "осуществлять разностороннюю защиту учетной записи Пользователя",
      "защищать информацию, распространение которой ограничено или запрещено законами путем вынесения предупреждения либо удалением учетной записи пользователя, нарушившего правила",
    ],
    block6: [
      "пользователь лично несет полную ответственность за распространяемую им информацию",
      "администрация не несет никакой ответственности за достоверность информации, скопированной из других источников",
      "администрация не несет никакой ответственности за услуги, предоставляемые третьими лицами",
      "в случае возникновения форс-мажорной ситуации (боевые действия, чрезвычайное положение, стихийное бедствие и т. д.) Администрация не гарантирует сохранность информации, размещённой Пользователем, а также бесперебойную работу информационного ресурса",
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
              Пользовательское Соглашение
            </Typography>
            <Typography variant={"body1"} fontSize={"18px"}>
              Настоящее Пользовательское Соглашение (Далее Соглашение)
              регулирует отношения между владельцем my-places.by (далее Знай
              свой край или Администрация) с одной стороны и пользователем сайта
              с другой. Сайт Знай свой край не является средством массовой
              информации.
            </Typography>
            <br />
            <Typography variant={"body1"} fontSize={"18px"}>
              Используя сайт, Вы соглашаетесь с условиями данного соглашения.
            </Typography>
            <Typography variant={"body1"} fontWeight={600} fontSize={"18px"}>
              Если Вы не согласны с условиями данного соглашения, не используйте
              сайт Знай свой край!
            </Typography>
          </Box>
          <Box>
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              Предмет соглашения
            </Typography>
            <Typography variant={"body1"} fontWeight={600}>
              Администрация предоставляет пользователю право на размещение на
              сайте следующей информации:
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
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              Предмет соглашения
            </Typography>
            <Typography variant={"body1"} fontWeight={600}>
              Пользователь имеет право:
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
              Администрация имеет право:
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
              Пользователь обязуется:
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
              Администрация обязуется:
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
              Ответственность сторон
            </Typography>
            <ul>
              {textLists.block6.map((text, index) => (
                <li key={index} className={"text-li"}>
                  <Typography variant={"body2"}>{text}</Typography>
                </li>
              ))}
            </ul>
          </Box>
          <Box>
            <Typography variant={"h3"} fontSize={{ xs: "1.3em", md: "1.5em" }}>
              Условия действия Соглашения
            </Typography>
            <Typography variant={"body2"}>
              Данное Соглашение вступает в силу при регистрации на сайте.
              <br />
              Соглашение действует бессрочно.
              <br />
              Администрация оставляет за собой право в одностороннем порядке
              изменять данное соглашение по своему усмотрению.
              <br />
              При изменении соглашения, в некоторых случаях, администрация может
              оповестить пользователей удобным для нее способом.
            </Typography>
          </Box>
        </Stack>
      </motion.div>
    </WrappedContainer>
  );
};

export default TermsOfUse;
