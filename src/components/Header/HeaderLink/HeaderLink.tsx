import {SxProps} from "@mui/material";
import {PropsWithChildren} from "react";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";

interface IHeaderLinkProps extends PropsWithChildren {
    to: string,
    sx?: SxProps,
    pathname?: string
}

export function HeaderLink({to, sx, pathname, children}: IHeaderLinkProps) {
    return <NextMuiLink
        className={pathname === to ? "active" : ""}
        href={to}
        sx={{
            fontSize: "14px",
            color: "secondary.main",
            py: "0.5em",
            px: "1em",
            borderRadius: "8px",
            textDecoration: "none",
            '&.active': {
                backgroundColor: '#FFE9D6'
            },
            '&:hover': {
                backgroundColor: '#FFE9D6'
            },
            ...sx
        }}
    >
        {children}
    </NextMuiLink>
}