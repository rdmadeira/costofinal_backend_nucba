import mongoose from 'mongoose';

export interface MailData {
  _id: mongoose.Types.ObjectId;
  status: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  user: mongoose.Types.ObjectId;
  email?: string;
  items: {
    product: {
      CODIGO: string;
      KIT: number;
      MEDIDA: string;
      PRECIO: number;
      SUBCATEGORY: mongoose.Types.ObjectId;
      CATEGORY?: mongoose.Types.ObjectId | undefined;
      quantity: number;
    };
    quantity: number;
  }[];
}
