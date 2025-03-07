import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { LogController } from "../controllers/LogController";
import { LogService } from "../services/LogService";

const router = Router();

const logsService = new LogService();
const logController = new LogController(logsService);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Send log JSON to Elastic Search
 *     responses:
 *       200:
 *         description: haha
 */
router.post("/log", asyncHandler((req, res) => logController.sendToES(req, res)));

export default router;