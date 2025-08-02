import { useEffect } from "react";
import { Box, BoxProps } from "@mui/material";

export enum YandexAdTypesEnum {
  FEED = "feed", // Для ленточных объявлений
  BANNER = "banner", // Стандартный баннер
  STICKY = "sticky", // Закрепленный блок
}

export enum YandexAdBlockIdsEnum {
  DefaultFeed = "R-A-16504984-2",
  DefaultBanner = "R-A-16504984-1",
}

interface IYandexAdProps extends BoxProps {
  blockId: string;
  type: YandexAdTypesEnum;
}

const YandexAd = ({ blockId, type, ...props }: IYandexAdProps) => {
  const containerId = `yandex_rtb_${blockId}`;

  useEffect(() => {
    // Проверяем что скрипт контекста загружен
    try {
      if (window.yaContextCb) {
        window.yaContextCb.push(() => {
          window.Ya.Context.AdvManager.render({
            blockId,
            renderTo: containerId,
            ...(type && { type }), // Добавляем тип только если он указан
          });
        });
      }
    } catch (e) {
      console.error("Error while mounting Yandex adv", e);
    }
  }, [blockId, containerId, type]);

  return <Box {...props} id={containerId} />;
};

export default YandexAd;
