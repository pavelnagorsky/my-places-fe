export interface IUpdateUser {
  firstName: string;
  lastName: string;
  email: string;
  receiveEmails: boolean;
  preferredLanguageId?: number;
}
