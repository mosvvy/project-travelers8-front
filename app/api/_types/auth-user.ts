export interface AuthUserRaw {
  _id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}
