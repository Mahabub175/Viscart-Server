import { Types } from "mongoose";
import { Status } from "../../interface/global/global.interface";

export interface ICart {
  product: Types.ObjectId;
  user?: Types.ObjectId;
  quantity: number;
  price: number;
  status: Status;
}
