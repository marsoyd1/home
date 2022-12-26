import { users, ip, log, home } from "@prisma/client";

export interface AdminRepositorys{
    findManyUsers():Promise<users[]>;
    deleteUser(id:number):Promise<void>;
    findUsers(id:number):Promise<users[]>;
    homeMany():Promise<home[]>;
    ipMany():Promise<ip[]>;
    logCount():Promise<number>;
    findManyLog(offset:number):Promise<log[]>;
}