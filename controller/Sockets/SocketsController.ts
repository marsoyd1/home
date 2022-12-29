import express ,{ Express ,Request, Response } from 'express';
import session from 'express-session';
import "../Auth/authorizationInerface";
import { HomeRepository } from '../repositories/HomeRepository';
import { SocketsRepository } from '../repositories/SocketsRepository';

const homeRepository = new HomeRepository();
const socketsRepository = new SocketsRepository();

export class SocketsController{
    async sockets(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const item = await homeRepository.findMany(Number(req.params.id));

                const sockets = await socketsRepository.findMany(Number( req.params.id));

                res.render("home/sockets/show", {
                    auth: req.session.auth,
                    username: req.session.username,
                    authId: req.session.authId,
                    home_id: req.params.id,
                    item,
                    sockets
                });

            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
    };

    async store(req: Request, res: Response){
        let redir = "/home/"+ req.params.id + "/sockets/create";
        req.session.loyalSockets = "";
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                if (req.body.name_sockets == "") {
                    req.session.loyalSockets = "Ни одно поле не может быть пустым";
                } else{
                    const {name_sockets}= req.body;
                    socketsRepository.create(name_sockets, Number(req.params.id));
                    redir = redir = "/home/" + req.params.id + "/sockets";
                };
                socketsRepository.storeLog(req.body.name_sockets, req.body.name_homeauth, String(req.session.username));
                res.redirect(redir);
            }else{
                res.redirect("/home");
            };

        }else{
            res.redirect("/login");
        };
    };

    async create(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                let loayl = req.session.loyalSockets; 
                req.session.loyalSockets = undefined;

                res.render("home/sockets/create",{
                    auth: req.session.auth,
                    username: req.session.username,
                    authId: req.session.authId,
                    home_id: req.params.id  ,
                    loyalLights: loayl,
                });
            }else{
                res.redirect("/home");
            };
        }else{
            res.redirect("/login");
        };
    };

    async edit(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const {id, value} = req.body;
                socketsRepository.update(id, value);
                res.redirect("/home/" + req.params.id + "/sockets");
            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
    };

}