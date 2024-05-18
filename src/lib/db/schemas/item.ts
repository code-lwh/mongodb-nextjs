export interface Item {
    _id?: string;
    name: string;
    description: string;
    quantity: number;
    categories: string[];
    price: number;
    image?: string; // Optional field for image URL
  }
  