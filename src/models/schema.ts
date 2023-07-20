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
  CODIGO: { type: String, require: true },
  KIT: { type: Number, require: true },
  MEDIDA: { type: String, require: true },
  PRECIO: { type: Number, require: true },
  SUBCATEGORY: {
    type: Schema.ObjectId,
    require: true,
    ref: mongoose.model('subcategories', SubcategoriesSchema),
  },
});

type CategoriesType = InferSchemaType<typeof CategoriesSchema>;
type SubCategoriesType = InferSchemaType<typeof SubcategoriesSchema>;
type ProductsType = InferSchemaType<typeof ProductsSchema>;

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
