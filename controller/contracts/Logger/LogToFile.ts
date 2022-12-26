import { Observer } from "../Observer/Observer";
import { Logger } from "./Logger";
import fs from 'fs';

export class LogToFile implements Logger, Observer {
    message: string;

    constructor() {
        this.message = "";
    }

    setMessage(message: string) {
        this.message = message;
    }

    addLog(): void {
        let time = new Date();
        fs.appendFileSync("./data/data.txt", `\n${time.toLocaleString()+ '  ' +this.message}`);
        let data = fs.readFileSync("./data/data.txt", "utf8");
    }

    handle(): void {
        this.addLog();
    }
}