// import { Telegraf } from "telegraf";
// require('dotenv').config()
// import{Request, response, Response} from "express"
import request from "request"


class tel {

   lets(){ 
        let url = "https://api.telegram.org/bot5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs/sendMessage"
        request.post({
            url: url,
            json: true,
            body: {
            chat_id: 5035806200,
            parse_mode: 'html',
            text: 'afddfdsdf'
            },
        },(error, response, body) =>{}
            )
    }
}
let tely = new tel().lets();

for(let i = 0; i<100; i++){
    setInterval(() =>{
        tely
    }, 1000)
    // tely
}

// while(1 == 1){
//     setTimeout(() =>{
//         tely
//     }, 1000)
//     // tely
// }

// const bot = new Telegraf("5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs");

// async function sendmsg(msg:string) {
//     let url = "https://api.telegram.org/bot5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs/getUpdates"

//     request.get(url, (err, response, body) =>{
//         console.log(body)
//     })
// // 5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs
// } 

// sendmsg('gsrgsergs')
// let arraymas=  {"ok":true,"result":[{"update_id":140033158,
// "message":{"message_id":181,"from":{"id":5035806200,"is_bot":false,"first_name":"\u041c\u0430\u043a\u0441\u0438\u043c","username":"marsoyd1","language_code":"ru"},"chat":{"id":5035806200,"first_name":"\u041c\u0430\u043a\u0441\u0438\u043c","username":"marsoyd1","type":"private"},"date":1670431756,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}},{"update_id":140033159,
// "message":{"message_id":182,"from":{"id":5035806200,"is_bot":false,"first_name":"\u041c\u0430\u043a\u0441\u0438\u043c","username":"marsoyd1","language_code":"ru"},"chat":{"id":5035806200,"first_name":"\u041c\u0430\u043a\u0441\u0438\u043c","username":"marsoyd1","type":"private"},"date":1670431776,"text":"/start","entities":[{"offset":0,"length":6,"type":"bot_command"}]}}]}
// for(let i =0; arraymas.result.length > i;i++){
//     console.log(arraymas.result[i].message.chat.id)
// }



// export class TelegramController{
//     whilesm(msg:string) {
//         // let time = new Date()
//         // msg = time.toLocaleString() + ' ' + msg
//         console.log(msg)
//         let url = "https://api.telegram.org/bot5916263292:AAHXhqb2Parj4zFtv23b3UIb-gxoy1LtZfs/sendMessage?chat_id=5035806200&parse_mode=html&text=" + msg
//         request.post(url, (error, response, body) =>{
//             // console.log(response);
//         })
//     }

//     lel(msg:string){
//         this.whilesm(msg);
//     }
// }


// let tel = new TelegramController().lel('test12')
// console.log(arraymas.result[0].message.chat.id)
// bot.launch();

// // Enable graceful stop
// process.once('SIGINT', () => bot.stop('SIGINT'));
// process.once('SIGTERM', () => bot.stop('SIGTERM'));