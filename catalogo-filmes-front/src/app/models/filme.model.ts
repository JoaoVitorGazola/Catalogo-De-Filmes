import { BaseModel } from "./base.model";
import { Categoria } from "./categoria.model";

export class Filme extends BaseModel {
    title: string;
    original_title: string;
    poster_path: string;
    overview: string;
    release_date: string;
    popularity: number;
    categorias: Categoria[];
}
