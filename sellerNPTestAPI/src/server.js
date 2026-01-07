const express = require("express");
const database = require("./config/db");
const cronJob = require("./cron/index");
const routes = require("./routes");
const cors = require("cors");
const morgan = require("morgan");
const { HOST, PORT } = require("./utils/env");

// requiring mongodb driver to connect to seller db for analytics report
require("./config/sellerDBConnect");

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.mongo();
    this.routes();
  }

  routes() {
    this.app.use('/', routes);
  }

  config() {
    this.app.set('port', PORT || 3000);
    this.app.set('host', HOST || 'localhost');
    this.app.use(express.json({ limit: '500mb' }))
    this.app.use(express.text({ limit: '500mb' }))
    this.app.use(express.urlencoded({ extended: true, limit: '500mb' }))
    this.app.use(cors())
    this.app.set('trust proxy', 1)
    this.app.use(morgan('combined'))
    this.app.get('/health', (req, res) => {
      res.status(200).send('OK');
    });
  }

  mongo() {
    database.connect();
    // cronJob.scheduleJob();
    // setInterval(() => {
    //   database.flushDB();
    // }, 86400000);
  }

  start() {
    this.app.listen(this.app.get('port'), this.app.get('host'), () => {
      console.log(` API is running at ${this.app.get('host')}:${this.app.get('port')}`)
    })
  }
}


const server = new Server()

server.start()
