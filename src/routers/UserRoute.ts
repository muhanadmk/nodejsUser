import express from "express";
export const userRoute = express.Router();

import { UserControllers } from '../controllers/UserControllers';
const userCtrl = new UserControllers();

userRoute.route('/').get(userCtrl.findALlUsers);
userRoute.route('/:id').get(userCtrl.findOneUser);
userRoute.route('/').post(userCtrl.createUser);
userRoute.route('/:id').put(userCtrl.updateUser);
userRoute.route('/:id').delete(userCtrl.deleteUser);
