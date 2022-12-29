import express ,{ Express ,Request, Response } from 'express';
import session from 'express-session';
import md5 from 'md5';
import path from 'path';
import "./authorizationInerface";
import { AuthRepository } from '../repositories/AuthRepository';

const authRepository = new AuthRepository();

export class AutorizationController{
    async registration_post(req: Request, res: Response) {
        let redir = "/registration";
        req.session.errRegistSt ="";
        const ip = await authRepository.findip(req.ip.split(':')[3]);
        if (req.body.username == "" || req.body.password == "") {
            req.session.errRegistSt = "Ни одно поле не может быть пустым";
            res.redirect(redir);
        }else if(ip[0] != undefined){ 
            req.session.errRegistSt = "Вы заблокированы";
            res.redirect(redir);
        } else {
            const {username} = req.body
            const data = await authRepository.findMany(username);
            if (data[0] != undefined) {
                req.session.errRegistSt = "Имя уже занято";
                res.redirect(redir);
            } else {
                await authRepository.create(req.body.username, req.body.password);
                redir = "/";
                req.session.auth = true;
                req.session.authRole = 0;
                req.session.errRegist = true;
                req.session.username = [req.body.username][0];
                const id  = await authRepository.findMany(req.body.username);
                req.session.authId = id[0].id;
                // log.adapter('Зарегистрирован аккаунт ' + [req.body.username][0]);
                authRepository.storeLog([req.body.username][0]);
                res.redirect(redir);
                };
                        
        };

    };

    async loginPost(req: Request, res: Response){
        let redir = "/login";
        req.session.loyalPass ="";
        const ip = await authRepository.findip(req.ip.split(':')[3]);
        if (req.body.username == "" || req.body.password == "") {
            req.session.loyalPass = "Ни одно поле не может быть пустым";
            // res.redirect(redir);
        } else if (ip[0] != undefined) { 
            req.session.loyalPass = "Вы заблокированы";
        }else{
            const {username} = req.body;
            const data = await authRepository.findMany(username);
            if (data[0] == undefined) {
                req.session.loyalPass = "Аккаунт не существует";
            } else if (md5(String([req.body.password])) == String(data[0].password)) {
                const id  = await authRepository.findMany(req.body.username);
                req.session.authId = id[0].id;
                redir = "/";
                req.session.authRole = id[0].Role;
                req.session.auth = true;
                req.session.username = [req.body.username][0];
                req.session.loyalPassb = true;
                authRepository.loginLog([req.body.username][0]);
            } else {
                req.session.loyalPass = "Неверный логин или пароль";
            };
        };
        res.redirect(redir);
    };

    async logout(req: Request, res: Response){
        req.session.auth = false;
        req.session.authId = undefined;
        req.session.authRole = undefined;
        authRepository.logoutLog(String(req.session.username));
        req.session.username = undefined;
        res.redirect("/");
    };

    registration(req: Request, res: Response){
        if(req.body.auth != 'login'){
            let loayl = req.session.errRegistSt; 
            req.session.errRegistSt = undefined;
             res.render("autorization/registration",{
                auth: req.session.auth,
                errRegist: req.session.errRegist,
                errRegistSt: loayl,
                username: req.session.username,
            });
        }else{
            res.redirect("/");
        };
    };

    login(req: Request, res: Response){
        if(req.body.auth != 'login'){
            let loayl = req.session.loyalPass; 
            req.session.loyalPass = undefined; 
            res.render("autorization/login",{
                auth: req.session.auth,
                username: req.session.username,
                loyalPass: loayl,
                loyalPassb: req.session.loyalPassb,
            });
        }else{
            res.redirect("/");
        };
    };
    
            
}