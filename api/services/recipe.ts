import { Request, Response, NextFunction } from "express";
import mongo from "../core/mongo";

const collectionName = "recipes";

const fetchRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await mongo.db
      .collection(collectionName)
      .find({})
      .toArray();
    return res.status(200).send(response);
  } catch (err) {
    next(err);
  }
};

const createRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await mongo.db
      .collection(collectionName)
      .insertOne(req.body);
    return res.status(200).send({ ...req.body, _id: response.insertedId });
  } catch (err) {
    next(err);
  }
};

export { fetchRecipes, createRecipe };
