import express from 'express';
import {getProducts, crateProducts, editProducts, deleteProducts, buyProducts, deleteAllProducts} from '../Controller/productController.js';
import productSlugify from '../Middleware/productSlugify.js';
const productRouter = express.Router();


productRouter.route("/").get(getProducts).post(productSlugify, crateProducts);
productRouter.route("/delete-all").delete(deleteAllProducts);
productRouter.route("/:id").put(editProducts).delete(deleteProducts);
productRouter.route("/buy/:id").post(buyProducts);



export default productRouter;