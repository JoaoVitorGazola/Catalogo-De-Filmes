import { BaseModel } from "./base.model";
import { Filme } from "./filme.model";

export class Categoria extends BaseModel {
    name: string;
    filmes: Filme[];
}
