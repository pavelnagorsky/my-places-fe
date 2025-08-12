export class Environment {
  static readonly domain = process.env["NEXT_PUBLIC_DOMAIN"] ?? "my-places.by";

  static readonly googleMapsKey =
    process.env["NEXT_PUBLIC_GOOGLE_API_KEY"] ?? "";

  static readonly googleGeocodeKey =
    process.env["NEXT_PUBLIC_GOOGLE_GEOCODE_API_KEY"] ?? "";

  static readonly googleClientId =
    process.env["NEXT_PUBLIC_GOOGLE_CLIENT_ID"] ?? "";

  static readonly backendBaseUrl =
    process.env["NEXT_PUBLIC_BACKEND_BASE_URL"] ?? "http://localhost:3000";

  static readonly email =
    process.env["NEXT_PUBLIC_EMAIL"] ?? "support@my-places.by";

  static readonly vkAppId = process.env["NEXT_PUBLIC_VK_APP_ID"] ?? "";

  static readonly vkCodeChallenge =
    process.env["NEXT_PUBLIC_VK_CODE_CHALLENGE"] ?? "";

  static readonly yandexAppId = process.env["NEXT_PUBLIC_YANDEX_APP_ID"] ?? "";

  static readonly GTMId = process.env["NEXT_PUBLIC_GTM_ID"] ?? "";

  static readonly instagram =
    process.env["NEXT_PUBLIC_INSTAGRAM"] ??
    "https://www.instagram.com/myplaces.by";

  static readonly telegram =
    process.env["NEXT_PUBLIC_TELEGRAM"] ?? "https://t.me/myplacesby";

  static readonly googleAdsKey = process.env[
    "NEXT_PUBLIC_GOOGLE_ADS_KEY"
  ] as string;
}
