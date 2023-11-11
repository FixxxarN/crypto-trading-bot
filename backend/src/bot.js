require("dotenv").config();

const WebSocket = require("ws");
const ccxt = require("ccxt");

const websocketUrl = "wss://stream.binance.com:443/ws/";
const asset = "sol";
const base = "usdt";
const dataType = "kline";
const dataInterval = "1m";

class Bot {
  constructor() {
    this.binanceWebSockets = undefined;
    this.webSocketServer = undefined;
    this.client = new ccxt.binance({
      apiKey: process.env.API_KEY,
      secret: process.env.API_SECRET,
    });
  }

  start() {
    this.binanceWebSocket = new WebSocket(
      `${websocketUrl}${asset}${base}@${dataType}_${dataInterval}`
    );

    this.webSocketServer = new WebSocket.WebSocketServer({ port: 12345 });

    this.binanceWebSocket.on("open", () => {
      console.log("Initialized websocket");
    });

    this.webSocketServer.on("connection", async (ws) => {
      ws.on('message', (data) => {
        if (data.toString() === 'close') {
          this.binanceWebSocket.close();
        }
      })

      this.binanceWebSocket.on("message", async (message) => {
        const obj = JSON.parse(message.toString());

        console.log(obj);
      });
    });

    this.binanceWebSocket.on('close', () => console.log('Closed websocket against binance'));

    this.binanceWebSocket.on("error", (error) => {
      console.log("error", error);
    });
  }
}

module.exports = Bot;