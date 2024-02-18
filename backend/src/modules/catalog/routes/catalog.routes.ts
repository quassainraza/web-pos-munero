import express from "express";
import { catalog } from "../controllers/catalog.controller";

export const router = express.Router();
router.get('/catalog', catalog);

