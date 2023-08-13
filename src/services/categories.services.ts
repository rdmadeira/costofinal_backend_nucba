import {
  CategoriesType,
  SubCategoriesType,
  categories,
  subCategories,
} from '../models/schema.js';
import { MongooseError } from 'mongoose';
import { ServerError } from '../entities/errors/ServerError.js';

const getCategories = async () => {
  try {
    const allCategories: CategoriesType[] = await categories.find({});

    return allCategories;
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError) {
      throw error;
    } else {
      const err = new ServerError('Error in categories.find - MongoDB');

      throw err;
    }
  }
};

const getSubcategoriesByCategory = async (categoryId: string) => {
  try {
    const subCategory: SubCategoriesType[] = await subCategories.find({
      category: categoryId,
    });
    return subCategory;
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError || error instanceof Error) {
      throw error;
    } else {
      const err = new ServerError('Error in categories.find - MongoDB');

      throw err;
    }
  }
};

const getSubCategoriesByUrl = async (categoryUrl: string) => {
  try {
    const category = await categories.findOne({ url: categoryUrl });

    const subCategory: SubCategoriesType[] = await subCategories.find({
      category: category?._id,
    });

    return subCategory;
  } catch (error: MongooseError | Error | any | unknown) {
    if (error instanceof MongooseError) {
      throw error;
    } else {
      const err = new ServerError('Error in categories.find - MongoDB');

      throw err;
    }
  }
};

export default {
  getCategories,
  getSubcategoriesByCategory,
  getSubCategoriesByUrl,
};
