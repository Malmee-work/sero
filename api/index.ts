import { json, urlencoded } from "body-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import mongo from "./core/mongo";
import { createRecipe, fetchRecipes } from "./services/recipe";

const app = express();

export class Application {
  constructor() {
    this.setupApplicationSettings();
    this.setupControllers();
  }

  setupApplicationSettings() {
    app.use(cors());
    app.use(urlencoded({ extended: false }));
    app.use(json());
  }

  async listen() {
    app.listen(3080, () => console.log("Listening on port 3080"));
    await mongo.connect();
  }

  setupControllers() {
    app.get("/recipes", fetchRecipes);
    app.post("/recipes", createRecipe);
  }
}

const application = new Application();

application.listen();
