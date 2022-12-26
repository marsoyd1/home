import express ,{ Express ,Request, Response } from 'express';
import session from 'express-session';
import "../Auth/authorizationInerface";
import { LogController } from '../LogController';
import { AdminRepository } from '../repositories/AdminRepository';

const log = new LogController();
const cors = require('cors');
const adminRepository = new AdminRepository();

export class AdminController{
    async user(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.session.authRole == 1){
                
                const users = await adminRepository.findManyUsers();

                res.render("admin/users",{
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    users: users
                });
            }else{
                res.redirect("/");
            }

        }else{
            res.redirect("/login");
        }
    };

    async usersDestroy(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.session.authRole == 1){
                const {id} = req.body;
                
                const user = await adminRepository.findUsers(id)

                adminRepository.deleteUser(id);

                // await log.adapter('Удален пользователь ' + user[0].username + ' пользователем ' + req.session.username);
                adminRepository.UserDestroyLog(user[0].username, String(req.session.username))
                res.redirect("/admin/users");
            }else{
                res.redirect("/");
            }

        }else{
            res.redirect("/login");
        }
    };

    async home(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.session.authRole == 1){
                const item = await adminRepository.homeMany();

                res.render("admin/home",{
                auth: req.session.auth,
                authId: req.session.authId,
                username: req.session.username,
                item
            });

            }else{
                res.redirect("/");
            }

        }else{
            res.redirect("/login");
        }
    };

    async ip(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.session.authRole == 1){
                const ip  = await adminRepository.ipMany();

                res.render("admin/ip",{   
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    ip
                });

            }else{
                res.redirect("/");
            }

        }else{
            res.redirect("/login");
        }
    };

    async log(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.session.authRole == 1){
                const log = await adminRepository.logCount();

                res.render("admin/log",{
                    auth: req.session.auth,
                    authId: req.session.authId,
                    username: req.session.username,
                    log
                });

            }else{
                res.redirect("/");
            }

        }else{
            res.redirect("/login");
        }
    };

    async logGet(req: Request, res: Response){
        if(req.body.pass == '12345678'){
            const log = await adminRepository.findManyLog(req.body.offset);
            
            res.status(200).send(log);
        }
    };
}