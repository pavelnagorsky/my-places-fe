import { Box, Divider, Stack } from "@mui/material";
import { useRouter } from "next/router";
import useAdminMenu from "@/hooks/useAdminMenu";
import { HeaderLink } from "@/components/Header/HeaderLink/HeaderLink";
import NextMuiLink from "@/components/NextMuiLink/NextMuiLink";

const AdminSideBar = () => {
  const { asPath } = useRouter();
  const adminLinks = useAdminMenu();

  const customPathname = asPath
    .split("/")
    .filter((p, i) => {
      return i <= 2;
    })
    .join("/");

  return (
    <Stack
      position={"sticky"}
      top={"1em"}
      px={"1em"}
      py={"1.5em"}
      border={"2px solid rgb(225, 228, 241)"}
      borderRadius={"10px"}
      width={"100%"}
    >
      {adminLinks.map((option, i) => (
        <Box key={i}>
          <NextMuiLink
            href={option.href}
            sx={{
              textDecoration: "none",
              fontWeight: 500,
              fontSize: "18px",
              color:
                option.href === customPathname
                  ? "secondary.dark"
                  : "primary.main",
            }}
          >
            {option.title}
          </NextMuiLink>
          <Divider
            sx={{
              my: "1em",
              opacity: 0.5,
              display: i === adminLinks.length - 1 ? "none" : "block",
            }}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default AdminSideBar;
