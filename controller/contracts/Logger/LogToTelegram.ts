import { Logger } from './Logger';
import { Observer } from '../Observer/Observer';
import request from "request"; 

export class LogToTelegram implements Logger, Observer {
    message: string;

    constructor() {
        this.message = "";
    }

    setMessage(message: string) {
        this.message = message;
    }

    async addLog() {
        let url = "https://api.telegram.org/bot5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs/sendMessage"

        request.post({
            url: url,
            json: true,
            body: {
              chat_id: 5035806200,
              parse_mode: 'html',
              text: this.message
            },
        },(error, response, body) =>{}
            );
            
    }

    async handle() {
        this.addLog();
    }
}