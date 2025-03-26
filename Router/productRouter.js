import express from 'express';
import {getProducts, crateProducts, editProducts, deleteProducts, buyProducts, deleteAllProducts} from '../Controller/productController.js';

const productRouter = express.Router();

productRouter.route("/").get(getProducts).post(crateProducts);
productRouter.route("/:id").put(editProducts).delete(deleteProducts);
productRouter.route("/buy/:id").post(buyProducts);
productRouter.route("/delete-all").delete(deleteAllProducts);


export default productRouter;