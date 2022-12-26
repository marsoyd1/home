import { home, PrismaClient} from '@prisma/client';

export interface HomeRepositorys{
    create(name: String, id:Number):Promise<void>;
    findMany(id:Number): Promise<home[]>;
    homes(id_user: Number): Promise<home[]>;
    delete(id: Number): Promise<void>;
    update(id:Number, name_home:String):Promise<void>;
}