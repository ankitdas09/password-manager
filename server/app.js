import express from "express";
import dotenv from "dotenv";
import startServer from "./utils/startServer.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

try {
	startServer(app, PORT);
} catch (error) {
	console.log(error);
}
