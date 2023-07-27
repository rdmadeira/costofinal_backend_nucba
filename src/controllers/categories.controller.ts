import { Request, Response, NextFunction } from 'express';
import { CategoriesType, SubCategoriesType } from '../models/schema.js';
import { categories, subCategories } from '../models/schema.js';

import { ServerError } from '../entities/errors/ServerError.js';
import { MongooseError } from 'mongoose';

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories: CategoriesType[] = await categories.find({});

    return res.status(200).json({
      data: allCategories,
      message: 'All categories found!',
    });
  } catch (error: MongooseError | Error | any | unknown) {
    const err = new ServerError('Error in categories.find - MongoDB');
    return next(err);
  }
};

export const getSubcategoriesByCategoryIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId } = req.params;
    const subCategory: SubCategoriesType[] = await subCategories.find({
      category: categoryId,
    });
    return res.status(200).json({
      data: subCategory,
      message: 'Subcategories found!',
    });
  } catch (error: MongooseError | Error | any | unknown) {
    const err = new ServerError('Error in categories.find - MongoDB');
    return next(err);
  }
};

export const getSubCategoriesByUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryUrl } = req.params;

    const category = await categories.findOne({ url: categoryUrl });

    const subCategory: SubCategoriesType[] = await subCategories.find({
      category: category?._id,
    });

    return res.status(200).json({
      data: subCategory,
      message: 'Subcategories found!',
    });
  } catch (error) {
    console.log('error', error);
    let serviceError;
    if (error instanceof Error) {
      serviceError = new ServerError(error.message);
    } else {
      serviceError = new ServerError('Error in service CRUD operations');
    }

    return next(serviceError);
  }
};
