import { ip, PrismaClient, users } from "@prisma/client";
// import { AuthRepositorys } from "./AuthRepositoryInterface";
import md5 from 'md5';
import { Subject } from "../contracts/Observer/Subject";
import { Repository } from "./Repository";
import { LogToFile } from "../contracts/Logger/LogToFile";
import { LogToDb } from "../contracts/Logger/LogToDb";

const prisma: PrismaClient = new PrismaClient();

export class AuthRepository extends Repository implements Subject{

    constructor(){
        super();

        const logToFile = new LogToFile();
        const logToDb = new LogToDb();

        this.attach(logToFile);
        this.attach(logToDb);
    };

    async findMany(username: string): Promise<users[]> {
        return prisma.users.findMany({
            where: {
                username
            }
        });
    };

    async create(username: string, password: string):Promise<void>{
        await prisma.users.create({
            data:{
                username: String(username),
                password: md5(String(password)),
                Role: 0
            }
            });
    };

    async findip(ip: string): Promise<ip[]> {
        return prisma.ip.findMany({
            where:{
                ip: String(ip)
            }
        })
    };

    log(message: string){
        this.observers.forEach(observer => {
            observer.setMessage(message);
        });

        super.notify();
    }

    storeLog(username: string) {
        this.log(`Зарегистрирован аккаунт ${username}`);
    };

    loginLog(username: string){
        this.log(`Выполнен вход в аккаунт ${username}`);
    };

    logoutLog(username: string) {
        this.log(`Выполнен выход из аккаунта ${username}`);
    };

}