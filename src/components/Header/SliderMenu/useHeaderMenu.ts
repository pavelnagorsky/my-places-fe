import {MouseEvent, useState} from "react";

export const useHeaderMenu = () => {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'header-menu' : undefined;

    return {
        anchorEl,
        handleClick,
        handleClose,
        open,
        id
    }
}