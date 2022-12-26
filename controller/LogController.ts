import express ,{ Express ,Request, Response } from 'express';
import { PrismaClient} from '@prisma/client';
import session from 'express-session'
import "./Auth/authorizationInerface";
const fs = require('fs');
import request from "request";
import path from 'path';


const prisma: PrismaClient = new PrismaClient();

export class LogController{
    private async mysql(action:String){
        await prisma.log.create({
            data:{
                dataaction: new Date(),
                action: String(action)
            }
        });
    };

    private file(actoin:String){
        let time = new Date();
        fs.appendFileSync("./data/data.txt", `\n${time.toLocaleString()+ '  ' +actoin}`);
        let data = fs.readFileSync("./data/data.txt", "utf8");
    };

    private telegram(msg:string){
        let url = "https://api.telegram.org/bot5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs/sendMessage"

        request.post({
            url: url,
            json: true,
            body: {
              chat_id: 5035806200,
              parse_mode: 'html',
              text: msg
            },
        },(error, response, body) =>{}
            );
            
    };

    adapter(action:string){
        this.file(action);
        this.mysql(action);
        this.telegram(action);
        // telegramController.lel(action);
    };
}

