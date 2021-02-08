import { BaseModel } from "./base.model";
import { Perfil } from "./perfil.model";

export class User extends BaseModel {
  email: string;
  password: string;
  facebook_id: string;
  perfis: Perfil[];
}
