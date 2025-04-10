import mongoose from 'mongoose';
import Product from "../models/productModel.js";
import { count } from 'console';

  const getProducts = async (req, res) => {
    const product = await Product.find({})
    res.json({product})
  };

  const crateProducts = (req, res) => {
    const product = new Product({...req.body, id: Date.now()});
    product.save();
    res.status(201).json(product);
  };
  const editProducts = async (req, res) => {
    const product = await Product.findOneAndUpdate({id: Number(req.params.id)}, req.body, {new: true})
    res.json(product);
  };
  const deleteProducts = async (req, res) => {
    try {
        const { id } = req.params;
        const numericId = Number(id);

        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid Product ID' });
        }

        const result = await Product.archivedProduct({ id: numericId });

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ message: 'Product archived successfully' });
    } catch (error) {
        console.error("Server error:", error);  
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};
  const buyProducts = async (req, res) => {
    try {
      const productId = Number(req.params.id);
      const product = await Product.findOne({id: productId});
      
      if (!product) {
          return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock <= 0) {
          return res.status(400).json({ message: "Product is out of stock" });
      }

      const updatedProduct = await Product.findOneAndUpdate(
          {id: productId}, 
          { stock: product.stock - 1 }, 
          { new: true }
      );
      
      res.json({
          message: "You bought that product",
          data: updatedProduct
      });
  } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
  }
  };
  const deleteAllProducts = async (req, res) => {
    const product = await Product.deleteMany();
    res.json({
      messege: 'Now array is clear'
    })
  }
  const getCategoryStats = async (req, res) =>{
    const stats = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          numProducts: {$sum: 1},
          avgPrice: { $avg: '$price'},
          minPrice: { $min: '$price'},
          maxPrice: { $max: '$price'},
        },
      },
      { $sort: { avgPrice: -1 }}
    ])
  };

 const getPriceStats = async (req, res) => {
  try{
    const priceRange = await Product.aggregate([
      {
        $bucket: {
          groupBy: '$price',
          boundaries: [0, 100, 200, 300],
          default: 'Other',
          output: {
            count: {$sum:1},
            max: { $max: '$price'},
            min: { $min: '$price'},
            avg: { $avg: '$price'},
          }
        }
      },
      {
        $addFields: {
          range: {
            $switch: {
              branches: [
                {case: {$lt: ['$_id', 100]}, then: '0-100'},
                {case: {$lt: ['$_id', 200]}, then: '0-200'},
                {case: {$lt: ['$_id', 300]}, then: '0-300'},
              ],
              default: '300+',
            }
          }
        }
      }
    ])

    res.json(priceRange);
  } catch(error) {
    res.status(500).json({messege: error.message})
  }
 }


export{getProducts, crateProducts, editProducts, deleteProducts, buyProducts, deleteAllProducts, getPriceStats, getCategoryStats};