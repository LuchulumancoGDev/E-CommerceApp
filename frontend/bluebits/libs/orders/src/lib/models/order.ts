import { OrderItem } from "./orderItem";
import { User } from '../../../../users/src/lib/models/user';

export class Order {
  id?: string;
  orderItem?: OrderItem;
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: string;
  totalPrice?: string;
  user?: User;
  dateOrdered?: string;
}


