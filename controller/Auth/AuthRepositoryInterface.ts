import { users, ip } from "@prisma/client";

export interface AuthRepositorys {
    findMany(username:string):Promise<users[]>;
    create(username:string, password:string):Promise<void>;
    findip(ip:string):Promise<ip[]>
}