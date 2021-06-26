export type TNotification = {
  type: string;
  isActive: boolean;
  id: string;
  label: string;
};

export interface IProduct {
  isEditable: boolean;
  id: string;
  name: string;
  price: number;
  origin: string;
  createdAt: string;
  updatedAt: string;
  photo?: string;
}

export interface IBasket extends IProduct {
  count: number;
}


export type ResponseGetProducts = {
  data: { items: IProduct[]; totalItems: number };
};
export type ResponseGetProduct = { data: IProduct };

