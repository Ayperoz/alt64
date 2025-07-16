import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Company } from "src/@core/domain/entities/company.entity";
import { SocketService } from "src/@core/infra/socket/socket.service";
import { CompaniesService } from "src/resources/v1/companies/companies.service";

@Injectable()
export class OnStartSockets implements OnModuleInit {

    logger: Logger = new Logger(OnStartSockets.name);

    companies: Array<Company> = new Array<Company>();

    constructor(
        private readonly companiesService: CompaniesService,
        private readonly socket: SocketService
    ) { }

    async onModuleInit() {
        try {

            // const companies = await this.companiesService.prisma.company.findMany();

            // if (companies.length > 0) {
            //     for (const company of companies) {
            //         this.socket.connect(company.idEmpresaMult100);
            //     }
            // }

        } catch (error: any) {
            this.logger.error(`Falha ao criar os sockets - ${error.message}`);
        }
    }

}