export class Environment {
  static readonly googleMapsKey = process.env["GOOGLE_API_KEY"] ?? "";
  static readonly backendBaseUrl =
    process.env["BACKEND_BASE_URL"] ?? "http://192.168.0.107:3000";
}
