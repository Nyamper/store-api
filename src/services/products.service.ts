import { TProduct } from '../types/types';
import ProductsModel from '../models/products.model';

class ProductsService {
  async addProducts(product: TProduct) {
    const newProduct = new ProductsModel(product);
    await newProduct.save();
    return newProduct;
  }
}

export default ProductsService;
