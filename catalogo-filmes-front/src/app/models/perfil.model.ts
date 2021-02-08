import { BaseModel } from "./base.model";
import { User } from "./user.model";

export class Perfil extends BaseModel {      
    user: User;
    nome: string;
}
