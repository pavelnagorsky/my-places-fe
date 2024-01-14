export class Environment {
  static readonly domain = process.env["DOMAIN"] ?? "my-places.by";

  static readonly googleMapsKey = process.env["GOOGLE_API_KEY"] ?? "";

  static readonly backendBaseUrl =
    process.env["BACKEND_BASE_URL"] ?? "http://localhost:3000";
}
