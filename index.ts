import express, { Express, Request, NextFunction, Response } from 'express';
import session, { Session } from 'express-session';
import path from 'path';
import { AutorizationController } from './controller/Auth/AuthorizationController';
import { MainController } from './controller/MainController';
import { HomeController } from './controller/Home/HomeController';
import { AdminController } from './controller/Admin/AdminController';
import { PrismaClient } from '@prisma/client';
import { LightsController } from './controller/Lights/LightsController';
import { SocketsController } from './controller/Sockets/SocketsController';

const app: Express = express();
const cors = require('cors');
const prisma: PrismaClient = new PrismaClient();
const mainController = new MainController();
const autorizationController = new AutorizationController();
const homeController = new HomeController();
const adminController = new AdminController();
const lightsController = new LightsController();
const socketsController = new SocketsController();

app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(session({ secret: "Secret", resave: false, saveUninitialized: true}));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// let accountShow = false;

function checkAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session.auth) {
    req.body.auth = 'login';
  } else {
    req.body.auth ='no';
  }  

  next();
}


async function checkHome (req: Request, res: Response, next: NextFunction): Promise<void>{
  if(req.body.auth == 'login'){
    const data = await prisma.home.findMany({
      where:{
        user_id: Number(req.session.authId),
        id: Number(req.params.id)
      }
    });
    if(data[0] != undefined || req.session.authRole == 1){
      req.body.authHome = 'yes';
      req.body.name_homeauth = data[0].name_home;
    }else{
      req.body.authHome = 'no';
    }
  }
  next();
};

app.get("/", [checkAuth], (req: Request, res: Response) => { 
  mainController.home(req, res);
});

app.post("/registration", (req: Request, res: Response) => {
  autorizationController.registration_post(req, res);
});

app.post("/login", (req: Request, res: Response) => {
  autorizationController.loginPost(req, res);
});

app.post("/logout", (req: Request, res: Response) => {
  autorizationController.logout(req, res);
});

app.get("/registration", [checkAuth], (req: Request, res: Response) => {
  autorizationController.registration(req, res);
});

app.get("/login", [checkAuth], (req : Request, res:Response) => {
  autorizationController.login(req, res);
});

app.get("/home", [checkAuth], (req: Request, res: Response) => {
  homeController.main(req, res);
});

app.get("/home/create", [checkAuth], (req: Request, res: Response) => {
  homeController.create(req, res);
});

app.post("/home/create", (req: Request, res: Response) => {
  homeController.store(req, res);
});

app.get("/home/:id", [checkAuth, checkHome],(req: Request, res: Response) => {
  homeController.show(req, res);
});

app.get("/home/:id/settings", [checkAuth, checkHome],(req:Request, res:Response) => {
  homeController.info(req,res);
});

app.get("/home/:id/edit",[checkAuth, checkHome],(req:Request, res:Response) => {
  homeController.edit(req,res);
});

app.post("/home/:id/update",[checkAuth, checkHome],(req:Request, res:Response) => {
  homeController.update(req,res);
});

app.post("/home/:id/destroy",[checkAuth, checkHome],(req: Request, res: Response) => {
  homeController.destroy_home(req, res);
});

app.post("/home/:id/lights/store", [checkAuth, checkHome],(req: Request, res: Response) => {
  lightsController.storeLights(req, res);
});

app.get("/home/:id/lights/create", [checkAuth, checkHome],(req: Request, res: Response) => {
  lightsController.createLights(req, res);
});

app.post("/home/:id/lights/edit",[checkAuth, checkHome],(req: Request, res: Response) => {
  lightsController.editLights(req, res);
});

app.get("/home/:id/lights",[checkAuth, checkHome],(req: Request, res: Response) => {
  lightsController.lights(req, res);
});

app.post("/home/:id/sockets/store", [checkAuth, checkHome],(req: Request, res: Response) => {
  socketsController.store(req, res);
});

app.get("/home/:id/sockets/create", [checkAuth, checkHome],(req: Request, res: Response) => {
  socketsController.create(req, res);
});

app.post("/home/:id/sockets/edit",[checkAuth, checkHome],(req: Request, res: Response) => {
  socketsController.edit(req, res);
});

app.get("/home/:id/sockets",[checkAuth, checkHome],(req: Request, res: Response) => {
  socketsController.sockets(req, res);
});

app.get("/admin/users", [checkAuth] ,(req: Request, res: Response) => {
  adminController.user(req,res);
});

app.post("/admin/users/destroy", [checkAuth] ,(req: Request, res: Response) => {
  adminController.usersDestroy(req,res);
});

app.get("/admin/home", [checkAuth] ,(req: Request, res: Response) => {
  adminController.home(req,res);
});

app.get("/test", async(req: Request, res: Response) => {
  // var forwardedIpsStr = req.header('x-forwarded-for');
  // var IP = '';

  // if (forwardedIpsStr) {
  //   IP = forwardedIpsStr.split(',')[0];
  //   // console.log(IP)
  // }
  // console.log(req.ip); 
  // console.log(req.ip.split(':')[3])

  // const log = await prisma.log.findMany({
  //   orderBy: [
  //     {dataaction: 'desc'}
  //   ],
    
  // })
  // console.log(log)
});

app.get("/admin/ip", [checkAuth], (req: Request, res: Response) => {
  adminController.ip(req,res);
});

app.get("/admin/log", [checkAuth], (req: Request, res: Response) => {
  adminController.log(req,res);
});
app.post("/admin/logs", (req: Request, res: Response) => {
  adminController.logGet(req,res);
});



