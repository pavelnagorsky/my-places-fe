import { GoogleOauthTypesEnum } from "@/services/auth-service/enums/google-oauth-type.enum";

export interface IGoogleOAuth {
  authCode?: string;
  oneTapCode?: string;
  type: GoogleOauthTypesEnum;
}
