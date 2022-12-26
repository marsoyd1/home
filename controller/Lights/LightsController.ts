import express ,{ Express ,Request, Response } from 'express';
import session from 'express-session';
import "../Auth/authorizationInerface";
import { LogController } from '../LogController';
import { HomeRepository } from '../repositories/HomeRepository';
import { LightsRepository } from '../repositories/LightsRepository';

const lightsRepository = new LightsRepository();
const homeRepository = new HomeRepository();
const log = new LogController();

export class LightsController{
    async lights(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const item = await homeRepository.findMany(Number(req.params.id))

                const lights = await lightsRepository.findMany(Number(req.params.id));
                res.render("home/lights/show", {
                    auth: req.session.auth,
                    username: req.session.username,
                    authId: req.session.authId,
                    home_id: req.params.id  ,
                    item,
                    lights
                });

            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
    };
    
    async storeLights(req: Request, res: Response){
        let redir = "/home/"+ req.params.id + "/lights/create";
        req.session.loyalLights = "";
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                if (req.body.name_lights == "") {
                    req.session.loyalLights = "Ни одно поле не может быть пустым";
                } else{
                    const {name_lights}= req.body;
                    lightsRepository.create(name_lights, Number(req.params.id));
                    lightsRepository.storeLog(req.body.name_lights, req.body.name_homeauth, String(req.session.username));
                    redir = "/home/" + req.params.id + "/lights";
                };
                res.redirect(redir);
            }else{
                res.redirect("/home");
            };

        }else{
            res.redirect("/login");
        };
        
    };

    async createLights(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){

                res.render("home/lights/create",{
                    auth: req.session.auth,
                    username: req.session.username,
                    authId: req.session.authId,
                    home_id: req.params.id  ,
                    loyalLights: req.session.loyalLights
                });
            }else{
                res.redirect("/home" );
            };
        }else{
            res.redirect("/login");
        };
    };
    async editLights(req: Request, res: Response){
        if(req.body.auth == 'login'){
            if(req.body.authHome == 'yes'){
                const {id, value} = req.body;
                lightsRepository.update(id, value)
                res.redirect("/home/" + req.params.id+ "/lights");
            }else{
                res.redirect("/home");
            };
        } else{
            res.redirect("/login");
        };
    };
}