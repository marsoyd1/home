import express ,{ Express ,Request, Response } from 'express';
import session from 'express-session';
import "../Auth/authorizationInerface";
import { LogController } from '../LogController';
import { HomeRepository } from '../repositories/HomeRepository';
import { LightsRepository } from '../repositories/LightsRepository';
import { SocketsRepository } from '../repositories/SocketsRepository';

const log= new LogController();
const homeRepository = new HomeRepository();
const lightsRepository = new LightsRepository();
const socketsRepository = new SocketsRepository();

export class HomeController {
    async main(req: Request, res: Response){
        if(req.body.auth == 'login'){
            const data = await homeRepository.homes(Number(req.session.authId));
            res.render("home/home", {
                item: data,
                auth: req.session.auth,
                username: req.session.username,
            });
        }else{
            res.redirect("/login");
        } ;
    };
    // HomeRepository create
    async store(req: Request, res: Response){
        let redir = "/home/create";
        req.session.loyalHome ="    ";
        if (req.body.name_home == "") {
             req.session.loyalHome = "Ни одно поле не может быть пустым";
        } else{
            const {name_home} = req.body;
            const {authId} = req.session;
            homeRepository.create(name_home, Number(authId));
            homeRepository.storeLog(name_home, String(req.session.username));
            redir = "/home";
        }
        res.redirect(redir);
    };

    async create(req: Request, res: Response){
        if(req.body.auth == 'login'){
            let loayl = req.session.loyalHome; 
            req.session.loyalHome = undefined;
            res.render("home/create", {
                auth: req.session.auth,
                authId: req.session.authId,
                username: req.session.username,
                loyalHome: loayl,
            });
            
        }else{
            res.redirect("/login");
        };
    };

    async show(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){

                const data = await homeRepository.findMany(Number( req.params.id))
                let time = new Date(data[0].datacreate);

                res.render("home/show",{
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    time: time.toLocaleString(),
                    item: data,
                });
            }else{
                res.redirect("/home");
            };
        }else{
            res.redirect("/login");
        };

    };

    

    async destroy_home(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
           
                const name_home = await homeRepository.findMany(Number(req.params.id));    
                homeRepository.delete(Number(req.params.id));
                homeRepository.destroyLog(name_home[0].name_home, String(req.session.username))
                res.redirect("/home");
            }else{
                res.redirect("/home");
            };
        }else{
            res.redirect("/login");
        };
    };

    async info(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){

                const item = await homeRepository.findMany(Number(req.params.id));
                let time = new Date(item[0].datacreate);

                const lights = await lightsRepository.count(Number(req.params.id));

                const sockets = await socketsRepository.count(Number(req.params.id));

                res.render("home/info",{
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    time: time.toLocaleString(),
                    item: item,
                    lights,
                    sockets
                });
            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
        
    };
    
    async update(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const {id, name_home} =req.body;
                if(name_home != ""){
                    homeRepository.update(Number(id), name_home);
                    homeRepository.updateLog(req.body.name_homeauth, name_home, String(req.session.username));
                    res.redirect("/home/" + id + "/settings");
                }else{
                    res.redirect("/home/" + id);
                };
            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
    };

    async edit(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const {id} = req.params;
                const item = homeRepository.findMany(Number(id));
                
                res.render("home/edit",{
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    item: item
                });

            }else{
                res.redirect("/home");
            }
        } else{
            res.redirect("/login");
        }
    };
    
}