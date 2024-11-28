import mongoose from "mongoose";
import { paginateAndSort } from "../../utils/paginateAndSort";
import { formatResultImage } from "../../utils/formatResultImage";
import { IProduct } from "./product.interface";
import { productModel } from "./product.model";
import { productSlug } from "../../utils/generateSlug";

//Create a product into database
const createProductService = async (
  productData: IProduct,
  filePath?: string
) => {
  const slug = productSlug(productData.name, productData.sku);

  const totalStock =
    productData.isVariant && Array.isArray(productData.variants)
      ? productData.variants.reduce(
          (sum, variant) => sum + (Number(variant.stock) || 0),
          0
        )
      : productData.stock || 0;

  const dataToSave = { ...productData, slug, filePath, stock: totalStock };

  return await productModel.create(dataToSave);
};

// Get all products with optional pagination
const getAllProductService = async (
  page?: number,
  limit?: number,
  searchText?: string,
  searchFields?: string[]
) => {
  let results;

  if (page && limit) {
    const query = productModel
      .find()
      .populate("category")
      .populate("brand")
      .populate("offers")
      .populate("reviews")
      .populate({
        path: "variants.attributeCombination",
        model: "attributeOption",
      });

    const result = await paginateAndSort(
      query,
      page,
      limit,
      searchText,
      searchFields
    );

    result.results = formatResultImage<IProduct>(
      result.results,
      "mainImage"
    ) as IProduct[];

    return result;
  } else {
    results = await productModel
      .find()
      .populate("category")
      .populate("brand")
      .populate("offers")
      .populate("reviews")
      .populate({
        path: "variants.attributeCombination",
        model: "attributeOption",
      })
      .sort({ createdAt: -1 })
      .exec();

    results = formatResultImage(results, "mainImage");

    return {
      results,
    };
  }
};

// Get single product
const getSingleProductService = async (productId: number | string) => {
  const queryId =
    typeof productId === "string"
      ? new mongoose.Types.ObjectId(productId)
      : productId;

  const result = await productModel
    .findById(queryId)
    .populate("category")
    .populate("brand")
    .populate("offers")
    .populate("reviews")
    .populate({
      path: "variants.attributeCombination",
      model: "attributeOption",
      populate: {
        path: "attribute",
        model: "attribute",
        populate: {
          path: "options",
          model: "attributeOption",
        },
      },
    })
    .exec();
  if (!result) {
    throw new Error("product not found");
  }

  if (typeof result.mainImage === "string") {
    const formattedAttachment = formatResultImage<IProduct>(result.mainImage);
    if (typeof formattedAttachment === "string") {
      result.mainImage = formattedAttachment;
    }
  }

  return result;
};

// Get single product by slug
const getSingleProductBySlugService = async (productSlug: number | string) => {
  const result = await productModel
    .findOne({ slug: productSlug })
    .populate("category")
    .populate("brand")
    .populate("offers")
    .populate("reviews")
    .populate({
      path: "variants.attributeCombination",
      model: "attributeOption",
    })
    .exec();

  if (!result) {
    throw new Error("Product not found");
  }

  if (typeof result.mainImage === "string") {
    const formattedAttachment = formatResultImage<IProduct>(result.mainImage);
    if (typeof formattedAttachment === "string") {
      result.mainImage = formattedAttachment;
    }
  }

  return result;
};

//Update single product
const updateSingleProductService = async (
  productId: string | number,
  productData: IProduct
) => {
  const queryId =
    typeof productId === "string"
      ? new mongoose.Types.ObjectId(productId)
      : productId;

  // const slug = productSlug(productData.name, productData.sku);

  const result = await productModel
    .findByIdAndUpdate(
      queryId,
      { $set: { ...productData } },
      { new: true, runValidators: true }
    )
    .exec();

  if (!result) {
    throw new Error("product not found");
  }

  return result;
};

//Delete single product
const deleteSingleProductService = async (productId: string | number) => {
  const queryId =
    typeof productId === "string"
      ? new mongoose.Types.ObjectId(productId)
      : productId;

  const result = await productModel.findByIdAndDelete(queryId).exec();

  if (!result) {
    throw new Error("product not found");
  }

  return result;
};

//Delete many product
const deleteManyProductsService = async (productIds: (string | number)[]) => {
  const queryIds = productIds.map((id) => {
    if (typeof id === "string" && mongoose.Types.ObjectId.isValid(id)) {
      return new mongoose.Types.ObjectId(id);
    } else if (typeof id === "number") {
      return id;
    } else {
      throw new Error(`Invalid ID format: ${id}`);
    }
  });

  const result = await productModel
    .deleteMany({ _id: { $in: queryIds } })
    .exec();

  return result;
};

export const productServices = {
  createProductService,
  getAllProductService,
  getSingleProductService,
  getSingleProductBySlugService,
  updateSingleProductService,
  deleteSingleProductService,
  deleteManyProductsService,
};
