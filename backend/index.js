import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { startStandaloneServer } from "@apollo/server/standalone";
import server from "./apollo/apolloServer.js";

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const { url } = await startStandaloneServer(server, { listen: 4000 });

console.log(`🚀  Apollo Server ready at: ${url}`);
