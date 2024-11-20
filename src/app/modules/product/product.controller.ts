import { NextFunction, Request, Response } from "express";
import { productServices } from "./product.service";

const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;

    const filePath = req.file ? req.file.path : undefined;

    const formData = {
      ...data,
      mainImage: filePath,
    };
    const result = await productServices.createProductService(formData);

    res.status(200).json({
      success: true,
      message: "Product Created Successfully",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

const getAllProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = page ? parseInt(page as string, 10) : undefined;
    const pageSize = limit ? parseInt(limit as string, 10) : undefined;

    const searchText = req.query.searchText as string | undefined;

    const searchFields = ["name"];

    const result = await productServices.getAllProductService(
      pageNumber,
      pageSize,
      searchText,
      searchFields
    );

    res.status(200).json({
      success: true,
      message: "Products Fetched Successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//Get single Product data
const getSingleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const result = await productServices.getSingleProductService(productId);
    res.status(200).json({
      success: true,
      message: "Product Fetched Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Get single Product data by slug
const getSingleProductBySlugController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productSlug } = req.params;
    const result = await productServices.getSingleProductBySlugService(
      productSlug
    );
    res.status(200).json({
      success: true,
      message: "Product Fetched by Slug Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Update single Product controller
const updateSingleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const data = req.body;
    const filePath = req.file ? req.file.path : undefined;

    const productData = {
      ...data,
      attachment: filePath,
    };

    const result = await productServices.updateSingleProductService(
      productId,
      productData
    );

    res.status(200).json({
      success: true,
      message: "Product Updated Successfully!",
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete single Product controller
const deleteSingleProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    await productServices.deleteSingleProductService(productId);
    res.status(200).json({
      success: true,
      message: "Product Deleted Successfully!",
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

//Delete many Product controller
const deleteManyProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productIds = req.body;

    if (!Array.isArray(productIds) || productIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty Product IDs array provided",
        data: null,
      });
    }

    const result = await productServices.deleteManyProductsService(productIds);

    res.status(200).json({
      success: true,
      message: `Bulk Product Delete Successful! Deleted ${result.deletedCount} Products.`,
      data: null,
    });
  } catch (error: any) {
    next(error);
  }
};

export const ProductControllers = {
  createProductController,
  getAllProductController,
  getSingleProductController,
  getSingleProductBySlugController,
  updateSingleProductController,
  deleteSingleProductController,
  deleteManyProductsController,
};
