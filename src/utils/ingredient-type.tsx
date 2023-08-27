export interface IIngredientInterface {
  readonly _id: string;
  readonly name: string;
  readonly type: string;
  readonly proteins: number;
  readonly fat: number;
  readonly carbohydrates: number;
  readonly calories: number;
  readonly price: number;
  readonly image: string;
  readonly image_mobile?: string;
  readonly image_large?: string;
  readonly __v: number;
  constructorId?: string;
  counter?: number;
}

type TStatusOrder = "done" | "created" | "pending";

export interface IOrderInterface {
  name: string;
  ingredients: string[];
  _id: string;
  status: TStatusOrder;
  number: number;
  createdAt: string;
  updatedAt: string;
}

export interface IOrderFeedAnswer {
  success: boolean;
  orders: IOrderInterface;
  total: number;
  totalToday: number;
}
