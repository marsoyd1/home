import { Request, Response } from 'express';

export class MainController{
     home(req: Request, res: Response){
        res.render('home',{
            auth: req.session.auth,
            username: req.session.username,
        });
    };
}