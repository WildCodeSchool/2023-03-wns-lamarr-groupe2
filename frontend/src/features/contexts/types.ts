// User Context Types

export type TUser = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  admin: boolean;
  points?: number;
  siret?: number;
  company_id?: number;
  company_group_id?: number;
  creationDate?: string;
};

export type LoginInformations = {
  email: string;
  password: string;
};

export type RegisterInformations = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
};

export type RegisterCompanyInformations = RegisterInformations & {
  siret: number;
};

export type UserContextType = {
  user: TUser;
  token: string;
  login: (e: React.FormEvent, value: LoginInformations) => void;
  disconnect: () => void;
};

export interface ApiReponse<ResponseType, Key extends string> {
  data: { viewer: Record<Key, { hits: ResponseType[] }> };
}
