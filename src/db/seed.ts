import { Document } from 'mongodb';
import mongoose from 'mongoose';
import { connectToDB } from './config.js';
import { categories, subCategories } from '../models/schema.js';

const categoriesList = [
  {
    name: 'BRONCE ROSCADO PARA AGUA',
  },
  { name: 'BRONCE TRAFILADO' },
  { name: 'CODOS Y TEES PARA GAS' },
  { name: 'POLIETILENO' },
  { name: 'POLIPROPILENO' },
  { name: 'REJAS Y TAPAS' },
  { name: 'TERMOCUPLAS' },
  { name: 'TERMOFUSION' },
  { name: 'FERRETERIA' },
];

const subCategoriesList = [
  { name: 'Bridas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Entreroscas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Bujes', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Cuplas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Reducciones', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tapones', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Uniones', category: '64b99b45fce65a50f8b13d21' },
];

const seedCategoriesToDB = async (documents: Document[]) => {
  await connectToDB();

  categories.collection.drop();

  categories
    .insertMany(documents)
    .then(() => console.log('Succesfully insert many documents to database'));
};

const seedsubCategoriesToDB = async (documents: Document[]) => {
  await connectToDB().then(() => console.log('connected to DB'));

  subCategories.collection.drop();

  subCategories
    .insertMany(documents)
    .then(() => console.log('Succesfully insert many documents to database'));
};
// seedCategoriesToDB(categoriesList);
seedsubCategoriesToDB(subCategoriesList);
