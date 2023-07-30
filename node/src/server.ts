import dotenv from "dotenv";

dotenv.config({
  path: `${__dirname}/env/.${process.env.NODE_ENV}.env`
})

import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import router from "./routers";

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

const PORT = process.env.PORT || 8080;

async function start() {
  try {
/*    await sequelize.sync({alter: true, force: true});
    console.log('[OK] Secuelize synced!');*/

    app.listen(PORT);
    console.log(`[OK] Server is started on port ${PORT}`);
  } catch(e) {
    console.log('[ERR] Seerver failed');
  }
}

start();