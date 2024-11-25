import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
  const result = await Product.create(productData);
  return result;
};

const getAllProductsFromDB = async (searchTerm: string | undefined) => {
  let filter = {};
  if (searchTerm) {
    filter = {
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } },
        { type: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }
  const result = await Product.find(filter);
  return result;
};

const getSingleProductFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

const updateSingleProductIntoDB = async (
  productId: string,
  updatedData: Partial<TProduct>,
) => {
  try {
    const result = await Product.findByIdAndUpdate(productId, updatedData, {
      new: true,
    });
    if (!result) {
      throw new Error('Product not found');
    }
    return result;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateSingleProductIntoDB,
};
