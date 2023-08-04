// User Context Types

export type TUser = {
  score: number;
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
  picture: string;
};

export type LoginInformations = {
  email: string;
  password: string;
};

export type UpdatedUser = {
  email : string;
  username : string;
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
  register: (e: React.FormEvent, value: RegisterInformations) => void;
  updateUser : (e : React.FormEvent, value : UpdatedUser) => void;
  deleteUserAccount : () => void;
};

export interface ApiReponse<ResponseType, Key extends string> {
  data: { viewer: Record<Key, { hits: ResponseType[] }> };
}
