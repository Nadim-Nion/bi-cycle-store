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

export const ProductServices = {
  createProductIntoDB,
  getAllProductsFromDB,
};
