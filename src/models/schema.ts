import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({ name: String });

const SubcategoriesSchema = new Schema({
  name: String,
  category: {
    type: Schema.ObjectId,
    ref: mongoose.model('categories', CategoriesSchema),
    require: true,
  },
});

const ProductsSchema = new Schema({
  CODIGO: { type: String, required: true },
  KIT: { type: Number, required: true },
  MEDIDA: { type: String, required: true },
  PRECIO: { type: Number, required: true },
  SUBCATEGORY: {
    type: Schema.ObjectId,
    required: true,
    ref: mongoose.model('subcategories', SubcategoriesSchema),
  },
});

export type CategoriesType = InferSchemaType<typeof CategoriesSchema>;
export type SubCategoriesType = InferSchemaType<typeof SubcategoriesSchema>;
export type ProductsType = InferSchemaType<typeof ProductsSchema>;

export const categories = mongoose.model<CategoriesType>(
  'categories',
  CategoriesSchema
);

export const subCategories = mongoose.model<SubCategoriesType>(
  'subcategories',
  SubcategoriesSchema
);

export const products = mongoose.model<ProductsType>(
  'products',
  ProductsSchema
);
