import { useTranslation } from "next-i18next";
import { Fragment } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import Link from "next/link";
import useCreateMenu from "@/components/Header/create-menu/useCreateMenu";

const CreateMenu = ({ activePath }: { activePath: string }) => {
  const { t } = useTranslation("common");
  const menu = useCreateMenu();

  const options = [
    {
      title: t("links.createReview"),
      href: "/create-review",
    },
    {
      title: t("links.createPlace"),
      href: "/create-place",
    },
  ];

  const isButtonActive =
    options.findIndex((opt) => opt.href === activePath) > -1;

  return (
    <Fragment>
      <Button
        className={isButtonActive ? "active" : ""}
        size="small"
        ref={menu.createMenuAnchorRef}
        aria-controls={menu.createMenuOpen ? "create-menu" : undefined}
        aria-expanded={menu.createMenuOpen ? "true" : undefined}
        aria-label="select what to create"
        aria-haspopup="menu"
        onClick={menu.handleToggleCreateMenu}
        sx={{
          fontSize: "14px",
          textTransform: "none",
          color: "secondary.main",
          py: "0.5em",
          px: "1em",
          borderRadius: "8px",
          textDecoration: "none",
          "&.active": {
            backgroundColor: "#FFE9D6",
          },
          "&:hover": {
            backgroundColor: "#FFE9D6",
          },
        }}
      >
        {t("links.create")}
      </Button>
      <Popper
        sx={{
          zIndex: 1,
        }}
        placement="auto-end"
        open={menu.createMenuOpen}
        anchorEl={menu.createMenuAnchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={menu.handleCloseCreateMenu}>
                <MenuList id="create-menu" autoFocusItem>
                  {options.map((option) => (
                    <MenuItem
                      component={Link}
                      key={option.href}
                      selected={option.href === activePath}
                      onClick={(event) => menu.setCreateMenu(false)}
                      href={option.href}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
};

export default CreateMenu;
