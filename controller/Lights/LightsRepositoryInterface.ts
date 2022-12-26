import { lights } from "@prisma/client";

export interface LightsRepositorys{
    findMany(id: Number): Promise<lights[]>;
    create(name_lights: String, id: Number): Promise<void>;
    update(id: Number, value: Number):Promise<void>;
    count(home_id: Number): Promise<number>;
};