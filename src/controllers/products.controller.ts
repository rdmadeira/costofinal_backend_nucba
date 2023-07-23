import { Request, Response, NextFunction } from 'express';
import { ProductsType } from '../models/schema.js';
import { products } from '../models/schema.js';

import { ServerError } from '../entities/errors/ServerError.js';

export const getProductsBySubcategoryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.params;

  try {
    const productsBySubcategory: ProductsType[] = await products.find({
      SUBCATEGORY: categoryId,
    });

    return res.status(200).json({
      data: productsBySubcategory,
      message:
        productsBySubcategory.length < 1
          ? 'No products found!'
          : 'Products Found!',
    });
  } catch (error) {
    const err = new ServerError('Error in product.find - MongoDB');
    return next(err);
  }
};
