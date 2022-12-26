import { Logger } from './Logger';
import { Observer } from '../Observer/Observer';
import { PrismaClient} from '@prisma/client';


const prisma: PrismaClient = new PrismaClient();

export class LogToDb implements Logger, Observer {
    message: string;

    constructor() {
        this.message = "";
    }

    setMessage(message: string) {
        this.message = message;
    }

    async addLog() {
        await prisma.log.create({
            data:{
                dataaction: new Date(),
                action: String(this.message)
            }
        });
    }

    async handle() {
        this.addLog();
    }
}