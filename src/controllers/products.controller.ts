import { Request, Response, NextFunction } from 'express';
import { categories, ProductsType } from '../models/schema.js';
import { products } from '../models/schema.js';

import { ServerError } from '../entities/errors/ServerError.js';

export const getProductsBySubcategoryIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subcategoryId } = req.params;

  try {
    const productsBySubcategory: ProductsType[] = await products.find({
      SUBCATEGORY: subcategoryId,
    });

    return res.status(200).json({
      data: productsBySubcategory,
      message:
        productsBySubcategory.length < 1
          ? 'No products found!'
          : 'Products Found!',
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
