import { PrismaClient, sockets } from "@prisma/client";
// import { SocketsRepositorys } from "./SocketsRepositoryInterface";
import { Subject } from "../contracts/Observer/Subject";
import { Repository } from "./Repository";
import { LogToFile } from "../contracts/Logger/LogToFile";
import { LogToDb } from "../contracts/Logger/LogToDb";


const prisma: PrismaClient = new PrismaClient();

export class SocketsRepository extends Repository implements Subject{

    constructor(){
        super();

        const logToFile = new LogToFile();
        const logToDb = new LogToDb();

        this.attach(logToFile);
        this.attach(logToDb);
    };

    async findMany(id: Number): Promise<sockets[]> {
        return prisma.sockets.findMany({
            where:{
                home_id: Number(id)
            }
        });
    };

    async create(name_sockets: String, id: Number): Promise<void> {
        await prisma.sockets.create({
            data:{
                name_sockets: String(name_sockets),
                home:{
                    connect:{id:Number(id)}
                },
                value: 0
            }
        });
    };
    
    async update(id: Number, value: Number): Promise<void> {
        await prisma.sockets.update({
            where:{
                id: Number(id)
            },
            data:{
                value: Number(value)
            }
        });
    };

    async count(home_id: Number): Promise<number> {
        return prisma.sockets.count({
            where:{
                home_id: Number(home_id)
            }
        });

    };

    log(message: string){
        this.observers.forEach(observer => {
            observer.setMessage(message);
        });

        super.notify();
    };

    storeLog(name_sockets:string , name_home: string ,username: string) {
        this.log(`Создано розетка ${name_sockets} в домe ${name_home} пользователем ${username}`);
    };


};