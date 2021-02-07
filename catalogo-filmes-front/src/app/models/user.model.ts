import { BaseModel } from "./base.model";

export class User extends BaseModel {
  email: string;
  password: string;
  facebook_id: string;
}
