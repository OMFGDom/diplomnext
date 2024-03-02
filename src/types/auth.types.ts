export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  isSuperuser: boolean;
  facultet: string;
}

export interface IAuthResponse {
  user: IUser;
  access_token: string;
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }