import { Fragment, PropsWithChildren, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { routerLinks } from "../routing/routerLinks";
import { useSSRLocalStorage } from "@/hooks/useSSRLocalStorage";
import { useRouter } from "next/router";
import { openAuth, selectIsAuth } from "@/store/user-slice/user.slice";
import localStorageFields from "@/shared/localStorageFields";

interface IProtectedRouteProps extends PropsWithChildren {
  redirectPath?: string;
  mode: "redirectAfter" | "redirectPermanent";
}

function ProtectedAuth({ children, redirectPath, mode }: IProtectedRouteProps) {
  const localStorage = useSSRLocalStorage();
  const lcToken = localStorage.getItem(localStorageFields.TOKEN);
  const router = useRouter();
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lcToken || (!lcToken && !isAuth)) {
      dispatch(
        openAuth({
          loginRedirect: redirectPath ?? router.asPath,
          redirectHomeOnCancel: mode === "redirectAfter",
        })
      );
      if (mode === "redirectPermanent") router.push(routerLinks.home);
    }
  }, [lcToken, redirectPath, isAuth, mode]);

  return <Fragment>{children}</Fragment>;
}

export default ProtectedAuth;
