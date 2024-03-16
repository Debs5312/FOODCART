export interface CartItem {
  quantity: number;
  productId: number;
  name: string;
  price: number;
  pictureUrl: string;
  type: string;
  brand: string;
}

export interface Cart {
  id: number;
  userId: string;
  items: CartItem[];
}
