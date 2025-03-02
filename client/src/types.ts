// types.ts
export interface CartItem {
  image: string;
  title: string;
  price: number;
  salePrice: number; // Ensure this is included
  productId: string;
  quantity: number;
  _id: string;
}
