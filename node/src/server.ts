import dotenv from "dotenv";
import cors from "cors";

dotenv.config({
  path: `${__dirname}/env/.${process.env.NODE_ENV}.env`
})

import express, { NextFunction } from "express";
import cookieParser from "cookie-parser";
import { sequelize } from "./sequelize";
import router from "./routers";
import { ErrorMiddleware } from "./middlewares/error.middleware";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";

const app = express();

let corsOptions = {
  origin: process.env.ORIGIN,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions));

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
    },
    (user, done) => {
      done(null, user);
    }
  )
)

passport.serializeUser((user: any, done) => {
  done(null, user)
})

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api', router);

app.use(ErrorMiddleware);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
    await sequelize.sync({alter: false, force: false});
    console.log('[OK] Secuelize synced!');

    app.listen(PORT);
    console.log(`[OK] Server is started on port ${PORT}`);

  } catch(e) {
    console.log('[ERR] Seerver failed');
  }
}

start();