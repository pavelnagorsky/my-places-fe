export enum UserTypesEnum {
  PRIVATE = 1,
  COMPANY = 2,
}

export interface ICreateFeedbackRequest {
  fullName: string;
  email: string;
  userType: UserTypesEnum;
  phone: string;
  message: string;
}
