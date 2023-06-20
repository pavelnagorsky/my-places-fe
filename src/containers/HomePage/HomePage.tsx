import {useTranslation} from "next-i18next";
import {Box} from "@mui/material";
import TextAndMainImage from "@/components/TextAndImage/TextAndMainImage";
import mainImageMd from "public/images/home-page/main-image-md.jpg";
import mainImageXs from "public/images/home-page/main-image-xs.jpg";
import {TextAndImage} from "@/components/TextAndImage/TextAndImage";
import card1Image from "public/images/home-page/card1.jpg";
import card2Image from "public/images/home-page/card2.jpg";
import BoxWithCircles from "@/components/UI/BoxWithCircles/BoxWithCircles";
import {TextWithBubbles} from "@/components/TextAndImage/TextWithBubbles";

const HomePage = () => {
    const {t} = useTranslation("homePage")
    return <Box>
        <TextAndMainImage
            textShadow
            title={t("title")}
            description={t("description")}
            showMobile
            imageUrlMd={mainImageMd}
            imageUrlXs={mainImageXs}
        />
        <TextAndImage
            title={t("card1.title")}
            description={t("card1.description")}
            btnText={t("card1.link")}
            linkTo={"/search"}
            showImageMobile
            image={card1Image}
        />
        <TextAndImage
            sx={{ mb: "0 !important" }}
            reverse
            title={t("card2.title")}
            description={t("card2.description")}
            btnText={t("card2.link")}
            linkTo={"/create"}
            showImageMobile
            image={card2Image}
        />
        <BoxWithCircles />
        <TextWithBubbles />
    </Box>
}

export default HomePage;