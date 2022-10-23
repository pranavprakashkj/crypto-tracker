import express from "express";
import { getPricebyDate } from "../controller/coinConroller.js";
import { minMax } from "../controller/userController.js";

const router = express.Router();
router.post("/setvalue", minMax);
router.get("/prices/btc", getPricebyDate);

export default router;
