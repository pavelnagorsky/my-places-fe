import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { Box, Stack, Tooltip, Typography } from "@mui/material";
import { PropsWithChildren } from "react";
import { OrderDirectionsEnum } from "@/services/interfaces";
import { useTranslation } from "next-i18next";

interface ISortingButtonProps extends PropsWithChildren {
  orderDirection: OrderDirectionsEnum;
  isActive: boolean;
  onChangeDirection: () => void;
  onChangeOrderBy: () => void;
}

const SortingButton = ({
  orderDirection,
  isActive,
  onChangeDirection,
  onChangeOrderBy,
  children,
}: ISortingButtonProps) => {
  const { t } = useTranslation("common");
  const onClick = () => {
    if (!isActive) {
      onChangeOrderBy();
    } else {
      onChangeDirection();
    }
  };

  return (
    <Tooltip
      arrow
      enterTouchDelay={0}
      title={<Typography fontSize={"12px"}>{t("sorting")}</Typography>}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        onClick={onClick}
        width={"fit-content"}
        sx={{
          cursor: "pointer",
          "&:hover": {
            opacity: isActive ? 1 : 0.7,
            "& .arrow": { display: "block" },
          },
        }}
      >
        {children}
        <Box
          className={"arrow"}
          color={"secondary.light"}
          sx={{
            marginInlineStart: "0.2em",
            opacity: 1,
            display: isActive ? "block" : "none",
          }}
        >
          {orderDirection === OrderDirectionsEnum.DESC ? (
            <ArrowDownwardIcon fontSize={"small"} />
          ) : (
            <ArrowUpwardIcon fontSize={"small"} />
          )}
        </Box>
      </Stack>
    </Tooltip>
  );
};

export default SortingButton;
