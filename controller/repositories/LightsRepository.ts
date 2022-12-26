import { lights, PrismaClient } from "@prisma/client";
// import { LightsRepositorys } from "./LightsRepositoryInterface";
import { Subject } from "../contracts/Observer/Subject";
import { Repository } from "./Repository";
import { LogToFile } from "../contracts/Logger/LogToFile";
import { LogToDb } from "../contracts/Logger/LogToDb";


const prisma: PrismaClient = new PrismaClient();

export class LightsRepository extends Repository implements Subject{

    constructor(){
        super();

        const logToFile = new LogToFile();
        const logToDb = new LogToDb();

        this.attach(logToFile);
        this.attach(logToDb);
    };

    async findMany(id: Number): Promise<lights[]> {
        return prisma.lights.findMany({
            where:{
                home_id: Number(id)
            }
        });
    };

    async create(name_lights: String, id: Number): Promise<void> {
        await prisma.lights.create({
            data:{
                name_lights: String(name_lights),
                home:{
                    connect:{id:Number(id)}
                },
                value: 0
            }
        });
    };

    async update(id: Number, value: Number): Promise<void> {
        await prisma.lights.update({
            where:{
                id: Number(id)
            },
            data:{
                value: Number(value)
            }
        });
    };

    async count(home_id: Number): Promise<number> {
        return prisma.lights.count({
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

    storeLog(name_lights:string , name_home: string ,username: string) {
        this.log(`Создано освещение ${name_lights} в домe ${name_home} пользователем ${username}`);
    };

}
