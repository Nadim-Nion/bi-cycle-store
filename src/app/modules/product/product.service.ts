import QueryBuilder from '../../builder/QueryBuilder';
import { productSearchableFields } from './product.constant';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(productSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fieldLimiting();

  const result = await productQuery.modelQuery;
  const meta = await productQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (productId: string) => {
  // Check if the product exists and is not deleted
  const result = await Product.findOne({
    _id: productId,
  });

  return result;
};

// const updateSingleProductIntoDB = async (
//   productId: string,
//   updatedData: Partial<TProduct>,
// ) => {
//   try {
//     const result = await Product.findByIdAndUpdate(productId, updatedData, {
//       new: true,
//     });
//     if (!result) {
//       throw new Error('Product not found');
//     }
//     return result;
//   } catch (err) {
//     const error = err as Error;
//     throw new Error(error.message);
//   }
// };

const updateSingleProductIntoDB = async (
  productId: string,
  updatedData: Partial<TProduct>,
) => {
  const result = await Product.findByIdAndUpdate(productId, updatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDB = async (productId: string) => {
  const result = await Product.updateOne(
    { _id: productId },
    { isDeleted: true },
  );
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
  deleteProductFromDB,
};
