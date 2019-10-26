// const { productsMock } = require('../utils/mocks');
const MongoConnect = require('../lib/mongo');

class ProductService {

  constructor () {
    this.collection = 'products';
    this.mongoDB = new MongoConnect();
  }

  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection, null);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || [];
  }

  async createProduct({ product }) {
    const productId = await this.mongoDB.create(this.collection, product);
    return productId;
  }

  async deleteProduct({ productId }) {
    const deletedId = await this.mongoDB.delete(this.collection, productId);
    return deletedId;
  }
}

module.exports = ProductService;
