export interface Product {
  id?: number;
  product_name: string;
  description: string;
  price: number;
  category_id: number;
  created_at?: Date;
  updated_at?: Date;
}
