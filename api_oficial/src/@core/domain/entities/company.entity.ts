import { Prisma } from "@prisma/client";

export class Company implements Prisma.companyUncheckedCreateInput {

    id?: number;
    create_at?: string | Date;
    update_at?: string | Date;
    deleted_at?: string | Date;
    name: string;
    whatsappOficial?: Prisma.whatsappOficialUncheckedCreateNestedManyWithoutCompanyInput;
    usersId: number;
    user?: Prisma.companyUncheckedCreateNestedManyWithoutUserInput
    idEmpresaMult100: number;

    constructor() {
        this.id = null;
        this.create_at = null;
        this.update_at = null;
        this.deleted_at = null;
        this.name = null;
        this.idEmpresaMult100 = null;
    }


}