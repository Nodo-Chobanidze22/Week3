import express from 'express';
import {crateUser, editUser, deleteUser} from '../Controller/userController.js';
import productSlugify from '../Middleware/productSlugify.js';

const userRouter = express.Router();
userRouter.route("/").post(productSlugify, crateUser);
userRouter.route("/:id").put(editUser);
userRouter.route("/:id").delete(deleteUser);


export default userRouter;