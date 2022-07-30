import { TProduct } from '../types/types';
import { Product } from '../models/products.model';

class ProductsService {
  constructor(private product: Product = new Product()) {}
  async addProducts(product: TProduct) {
    const newProduct = new this.product.model(product);
    await newProduct.save();
    return newProduct;
  }
}

export default ProductsService;
