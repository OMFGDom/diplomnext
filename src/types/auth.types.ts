export interface IAuthForm {
  email: string;
  password: string;
}

export interface IUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  created_at: string;
  last_login_at: string;
  is_active: boolean;
  is_superuser: boolean;
  faculty_id: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }