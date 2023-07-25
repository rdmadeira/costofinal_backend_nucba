import mongoose, { InferSchemaType } from 'mongoose';

const Schema = mongoose.Schema;

const CategoriesSchema = new Schema({ name: String });
export type CategoriesType = InferSchemaType<typeof CategoriesSchema>;
export const categories = mongoose.model<CategoriesType>(
  'categories',
  CategoriesSchema
);

const SubcategoriesSchema = new Schema({
  name: String,
  category: {
    type: Schema.ObjectId,
    ref: 'categories',
    require: true,
  },
});
export type SubCategoriesType = InferSchemaType<typeof SubcategoriesSchema>;
export const subCategories = mongoose.model<SubCategoriesType>(
  'subcategories',
  SubcategoriesSchema
);

const ProductsSchema = new Schema({
  CODIGO: { type: String, required: true },
  KIT: { type: Number, required: true },
  MEDIDA: { type: String, required: true },
  PRECIO: { type: Number, required: true },
  SUBCATEGORY: {
    type: Schema.ObjectId,
    required: true,
    ref: 'subcategories',
  },
});
export type ProductsType = InferSchemaType<typeof ProductsSchema>;
export const products = mongoose.model<ProductsType>(
  'products',
  ProductsSchema
);

const RoleSchema = new Schema({
  role: { type: String, unique: true },
});
export type RoleType = InferSchemaType<typeof RoleSchema>;
export const roles = mongoose.model<RoleType>('roles', RoleSchema);

const UserSchema = new Schema({
  nombre: String,
  apellido: String,
  telefono: String,
  email: { type: String, unique: true, required: true },
  contrasena: { type: String, required: true },
  role: {
    type: Schema.ObjectId,
    default: '64bdaf104cd48e08d6d630dc',
    ref: roles,
  },
  direccion: {
    calle: String,
    numero: String,
    localidad: String,
    CP: String,
    complemento: String,
  },
});
export type UsersType = InferSchemaType<typeof UserSchema>;
export const users = mongoose.model<UsersType>('users', UserSchema);

const StatusSchema = new Schema({
  status: String,
});
export type StatusType = InferSchemaType<typeof StatusSchema>;
export const status = mongoose.model<StatusType>('status', StatusSchema);

const OrderSchema = new Schema({
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  user: {
    type: Schema.ObjectId,
    required: true,
    ref: users,
  },
  items: [
    {
      product: { type: Schema.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true },
    },
  ],

  status: {
    type: Schema.ObjectId,
    default: '64bdbdb93873cdd7824ad762',
    ref: 'status',
  },
});
export type OrdersType = InferSchemaType<typeof OrderSchema>;
export const orders = mongoose.model<OrdersType>('orders', OrderSchema);
