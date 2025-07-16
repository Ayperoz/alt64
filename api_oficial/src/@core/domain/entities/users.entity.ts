import { Prisma } from "@prisma/client";

export class Users implements Prisma.usersUncheckedCreateInput {

    id?: number;
    create_at?: string | Date;
    update_at?: string | Date;
    deleted_at?: string | Date;
    name: string;
    email: string;
    salt: string;
    password: string;
    super?: boolean;

    constructor() {
       this.id = null;
       this.create_at = null; 
       this.update_at = null; 
       this.deleted_at = null; 
       this.name = null; 
       this.email = null; 
       this.password = null; 
       this.salt = null; 
       this.super = null; 
    }
   
}