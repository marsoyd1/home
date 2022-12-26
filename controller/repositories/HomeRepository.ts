import { home, PrismaClient} from '@prisma/client';
// import { HomeRepositorys } from './HomeRepositoryInterface';
import { Subject } from "../contracts/Observer/Subject";
import { Repository } from "./Repository";
import { LogToFile } from "../contracts/Logger/LogToFile";
import { LogToDb } from "../contracts/Logger/LogToDb";

const prisma: PrismaClient = new PrismaClient()


export class HomeRepository extends Repository implements Subject{

    constructor(){
        super();

        const logToFile = new LogToFile();
        const logToDb = new LogToDb();

        this.attach(logToFile);
        this.attach(logToDb);
    };

    async create(name:String, id:Number): Promise<void> {
        let data = new Date();
        await prisma.home.create({
            data: {
                name_home: String(name),
                user:{
                    connect: {id:Number(id)}
                },
                datacreate: data,
            }
        });    
    };

    async findMany(id: Number): Promise<home[]> {
        return prisma.home.findMany({
            where:{
                id: Number(id)
            }
        });
    };

    async homes(id_user: Number): Promise<home[]> {
        return prisma.home.findMany({
            where:{
                user_id: Number(id_user)
            }
        });
    }

    async delete(id: Number): Promise<void> {
        await prisma.home.delete({
            where:{
                id: Number(id)
            }
        });
    };



    async update(id: Number, name_home: String): Promise<void> {
        await prisma.home.update({
            where:{
                id: Number(id)
            },
            data:{
                name_home: String(name_home)
            }
        });
    };

    log(message: string){
        this.observers.forEach(observer => {
            observer.setMessage(message);
        });

        super.notify();
    };

    storeLog(name_home: string ,username: string) {
        this.log(`Создан дом ${name_home} пользователем ${username}`);
    };

    destroyLog(name_home: string, username: string){
        this.log(`Удален дом ${name_home} пользователем ${username}`);
    };

    updateLog(name_homeauth: string, name_home:string ,username: string) {
        this.log(`Обновлено имя дома ${name_homeauth} на ${name_home} пользователем ${username}`);
    };

}