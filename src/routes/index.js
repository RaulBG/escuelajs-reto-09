const express = require('express');
const path = require('path');
const ProductService = require('../services');
const receipt = '../assets/receipt.pdf';


const platziStore = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const productService = new ProductService();

  router.get('/', (req, res) => {
    res.send(`API v2`);
  });

  router.get('/receipts', (req, res, next) => {
    let file = path.join(__dirname, receipt);
    res.sendFile(file);
  });

  router.get('/products', async (req, res, next) => {
    const storeProducts = await productService.getProducts()
    res.status(200).json(storeProducts);
  });

  router.post('/product', async (req, res, next) => {
    try {
      const { body: product } = req;
      const productId = await productService.createProduct({ product });
      res.status(200).json({
        'message': 'Product created',
        'id': productId
      })
    } catch (error) {
      console.log(error)
    }
  })

  router.get('/product/:productId', async (req, res, next) => {
    const { productId } = req.params;
    try {
      const product = await productService.getProduct({ productId });
      res.status(200).json(product);
    } catch (error) {
      console.log(error)
    }
  });

  router.delete('/product/:productId', async (req, res, next) => {
    const productId = req.params;
    try {
      const deletedId = await productService.deleteProduct( productId );
      res.status(200).json({
        'message': 'Product deleted',
        'id': deletedId
      })
    } catch (error) {
      console.log(error);
    }
  })

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = platziStore;