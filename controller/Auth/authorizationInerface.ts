import session from 'express-session'

declare module "express-session" {
    export interface SessionData {
      auth: boolean;
      authId: number;
      errRegist: boolean;
      username: string;
      loyalPass:string;
      loyalPassb: boolean;
      errRegistSt: string;
      loyalHome: string;
      loyalLights: string;
      loyalSockets: string;
      authRole: number;
    }
  };