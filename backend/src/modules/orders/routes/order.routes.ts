import express from "express";
import { order } from "../controllers/order.controller";

export const router = express.Router();

router.post('/order', order)

