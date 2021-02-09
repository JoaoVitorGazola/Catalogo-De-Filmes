import { BaseModel } from "./base.model";
import { Filme } from "./filme.model";
import { User } from "./user.model";

export class Perfil extends BaseModel {      
    user: User;
    nome: string;
    filmesAssistidos: Filme[];
    filmesParaAssistir: Filme[];
}
