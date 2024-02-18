import express from "express";
import { loginPos } from "../controllers/auth.controller";

export const router = express.Router();

router.post('/', loginPos)

