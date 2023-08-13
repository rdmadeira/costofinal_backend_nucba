import { Request, Response, NextFunction } from 'express';

import CategoriesServices from '../services/categories.services.js';

import { ServerError } from '../entities/errors/ServerError.js';
import { MongooseError } from 'mongoose';
import categoriesServices from '../services/categories.services.js';

export const getCategoriesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allCategories = await CategoriesServices.getCategories();

    return res.status(200).json({
      data: allCategories,
      message: 'All categories found!',
    });
  } catch (error: MongooseError | ServerError | any | unknown) {
    console.error('error', error);

    return next(error);
  }
};

export const getSubcategoriesByCategoryIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;
  try {
    const subCategory = await categoriesServices.getSubcategoriesByCategory(
      categoryId
    );

    return res.status(200).json({
      data: subCategory,
      message: 'Subcategories found!',
    });
  } catch (error: MongooseError | Error | any | unknown) {
    console.error('error', error);

    return next(error);
  }
};

export const getSubCategoriesByUrlController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryUrl } = req.params;

    const subCategory = await categoriesServices.getSubCategoriesByUrl(
      categoryUrl
    );

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
