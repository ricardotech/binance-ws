// server.ts

import express from "express";
import http from "http";
import { Server } from "socket.io";
import Binance from "binance-api-node";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
  },
});

const client = Binance({
  apiKey: process.env.BINANCE_API_KEY!,
  apiSecret: process.env.BINANCE_API_SECRET!,
});

const binanceWs = client.ws;

server.listen(3850, () => {
  binanceWs.ticker("BTCBRL", (ticker) => {
    console.log(ticker.symbol, ticker.weightedAvg);
    io.emit("btcPriceUpdate", {
      price: parseFloat(ticker.weightedAvg),
      percentChange: parseFloat(ticker.priceChangePercent),
    });
  });
  binanceWs.ticker("LTCBRL", (ticker) => {
    console.log(ticker.symbol, ticker.weightedAvg);
    io.emit("ltcPriceUpdate", {
      price: parseFloat(ticker.weightedAvg),
      percentChange: parseFloat(ticker.priceChangePercent),
    });
  });
  binanceWs.ticker("ETHBRL", (ticker) => {
    console.log(ticker.symbol, ticker.weightedAvg);
    io.emit("ethPriceUpdate", {
      price: parseFloat(ticker.weightedAvg),
      percentChange: parseFloat(ticker.priceChangePercent),
    });
  });
  binanceWs.ticker("DOGEBRL", (ticker) => {
    console.log(ticker.symbol, ticker.weightedAvg);
    io.emit("dogePriceUpdate", {
      price: parseFloat(ticker.weightedAvg),
      percentChange: parseFloat(ticker.priceChangePercent),
    });
  });
  console.log("Servidor rodando na porta 3850");
});
