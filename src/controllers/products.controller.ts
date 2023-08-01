import { Request, Response, NextFunction } from 'express';
import { categories, CategoriesType, ProductsType } from '../models/schema.js';
import { products } from '../models/schema.js';

import { ServerError } from '../entities/errors/ServerError.js';
import mongoose from 'mongoose';

export const getProductsByQuerycategoryIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { subcategoryId, categoryId, categoryUrl, populate } = req.query;

  try {
    const categoryByUrl = await categories.find({
      url: categoryUrl,
    });

    if (!categoryUrl && !categoryId && !subcategoryId) {
      const allProducts = await products.find({});

      return res.json({ data: allProducts, message: 'Get all products' });
    }

    let productsBySubcategory;
    let productsByCategory;
    if (populate == 'true') {
      productsBySubcategory = await products
        .find({
          SUBCATEGORY: subcategoryId,
        })
        .populate('SUBCATEGORY')
        .populate('CATEGORY');
      productsByCategory = await products
        .find({
          CATEGORY:
            categoryId || new mongoose.Types.ObjectId(categoryByUrl[0]._id),
        })
        .populate('CATEGORY')
        .populate('SUBCATEGORY');
    } else {
      productsBySubcategory = await products.find({
        SUBCATEGORY: subcategoryId,
      });
      productsByCategory = await products.find({
        CATEGORY:
          categoryId || new mongoose.Types.ObjectId(categoryByUrl[0]._id),
      });
    }

    return res.status(200).json({
      subcategoryData: {
        data: productsBySubcategory,
        length: productsBySubcategory.length,
        message:
          productsBySubcategory.length < 1
            ? 'No products found!'
            : 'Products Found!',
      },
      categoryData: {
        data: productsByCategory,
        length: productsByCategory.length,
        message:
          productsByCategory.length < 1
            ? 'No products found!'
            : 'Products Found!',
      },
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

/* export const getProductsByCategoryIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { categoryId } = req.query;
  console.log('categoryId', categoryId);

  try {
    const productsBySubcategory: ProductsType[] = await products.find({
      CATEGORY: categoryId,
    });

    return res.status(200).json({
      data: productsBySubcategory,
      length: productsBySubcategory.length,
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
}; */
