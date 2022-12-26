import { PrismaClient, users, ip, home, log } from "@prisma/client";
// import { AdminRepositorys } from "../Admin/AdminRepositoryInterface";
import { Subject } from "../contracts/Observer/Subject";
import { Repository } from "./Repository";
import { LogToFile } from "../contracts/Logger/LogToFile";
import { LogToDb } from "../contracts/Logger/LogToDb";
import { LogToTelegram } from "../contracts/Logger/LogToTelegram";

const prisma: PrismaClient = new PrismaClient();

export class AdminRepository extends Repository implements Subject{

    constructor(){
        super();

        const logToFile = new LogToFile();
        const logToDb = new LogToDb();
        const logToTelegram = new LogToTelegram();

        this.attach(logToFile);
        this.attach(logToDb);
        this.attach(logToTelegram);
    };

    async findManyUsers(): Promise<users[]> {
        return prisma.users.findMany({});
    };

    async deleteUser(id: number): Promise<void> {
        await prisma.users.delete({
            where:{
                id: Number(id)
            }
        });
    };

    async findUsers(id: number): Promise<users[]> {
        return prisma.users.findMany({
            where:{
                id: Number(id)
            },
            // select:{
            //     username: true
            // }
        });
    };

    async homeMany(): Promise<home[]> {
        return prisma.home.findMany({
            include:{
                user:{
                    select:{
                        username:true
                    }
                }
            }
        });
    };

    async ipMany(): Promise<ip[]> {
        return prisma.ip.findMany({}); 
    };

    async logCount(): Promise<number> {
        return prisma.log.count({});
    };

    async findManyLog(offset: number): Promise<log[]> {
        return prisma.log.findMany({
            orderBy: [
                {dataaction: 'desc'}
              ],
              take:100,
              skip: offset
        });
    };

    log(message: string){
        this.observers.forEach(observer => {
            observer.setMessage(message);
        });

        super.notify();
    };

    UserDestroyLog(usersDestroy: string, username: string){
        this.log(`Удален пользователь ${usersDestroy} пользователем ${username}`);
    };

}