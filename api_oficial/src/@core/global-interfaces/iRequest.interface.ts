import { Users } from "../domain/entities/users.entity"

export interface IRequest extends Request {
    user: Users;
}