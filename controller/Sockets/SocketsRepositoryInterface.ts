import { sockets } from "@prisma/client";

export interface SocketsRepositorys{
    findMany(id: Number): Promise<sockets[]>;
    create(name_sockets: String, id: Number): Promise<void>;
    update(id: Number, value: Number):Promise<void>;
    count(home_id: Number): Promise<number>;
};