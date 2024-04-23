export class Environment {
  static readonly domain = process.env["NEXT_PUBLIC_DOMAIN"] ?? "my-places.by";

  static readonly googleMapsKey =
    process.env["NEXT_PUBLIC_GOOGLE_API_KEY"] ?? "";

  static readonly backendBaseUrl =
    process.env["NEXT_PUBLIC_BACKEND_BASE_URL"] ?? "http://localhost:3000";

  static readonly email =
    process.env["NEXT_PUBLIC_EMAIL"] ?? "support@my-places.by";
}
