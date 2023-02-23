import { Ingredient } from "./ingredient";

export type Recipe = {
  _id?: string;
  name: string;
  ingredients?: Array<Ingredient>;
  methods?: Array<string>;
};
