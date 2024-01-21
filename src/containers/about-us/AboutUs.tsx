import animationVariants from "@/shared/animation-variants";
import { motion } from "framer-motion";
import TextAndImage from "@/components/text-and-image/TextAndImage";
import WrappedContainer from "@/hoc/wrappers/WrappedContainer";
import { useTranslation } from "next-i18next";
import card1Image from "/public/images/about-us/card1.jpg";
import card2Image from "/public/images/about-us/card2.jpg";

const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <motion.div
      variants={animationVariants.defaultContainerVariant}
      initial="hidden"
      animate="show"
    >
      <WrappedContainer>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            titleComponent={"h1"}
            sx={{
              mt: { xs: "1em", md: "2em" },
              "& .description": {
                fontSize: { xs: "18px", md: "20px" },
              },
              "& .title": {
                fontSize: { xs: "30px", md: "40px" },
              },
            }}
            title={"О проекте"}
            description={
              "При планировании туристического маршрута, порой приходится долго собирать данные из различных источников – подбивать перечень объектов, которые стоит посетить. А после посещения, возникает желание поделиться накопленными впечатлениями. Наш сайт – универсальный гид-путеводителем по стране, который наполняется самими пользователями. Наша задача состоит в популяризации внутреннего туризма и  ознакомлении с красотами Беларуси! "
            }
            showImageMobile
            image={card1Image}
          />
        </motion.div>
        <motion.div variants={animationVariants.defaultItemVariant}>
          <TextAndImage
            sx={{
              "& .description": {
                fontSize: { xs: "18px", md: "20px" },
              },
            }}
            description={
              "В основе сайта лежат два понятия: Место и Заметка. Место – это непосредственно туристический объект. Заметка – авторская мини-экскурсия по данному Месту. Зарегистрированные пользователи имеют доступ к Личному кабинету, в котором отображаются все созданные места, заметки и их текущий статус, с возможностью просмотра и редактирования. Сайт поддерживает три языка: белорусский, русский, английский. После ввода на выбранном языке, вся текстовая информация автоматически переводится на другие языки сайта."
            }
            showImageMobile
            reverse
            image={card2Image}
          />
        </motion.div>
      </WrappedContainer>
    </motion.div>
  );
};

export default AboutUs;
