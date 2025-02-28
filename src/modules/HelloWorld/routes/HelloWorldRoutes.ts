import { Router } from "express";
import { HelloWorldController } from "../controllers/HelloWorldController";
import { HelloWorldService } from "../services/HelloWorldService";

const router = Router();

const helloWorldService = new HelloWorldService();
const helloWorldController = new HelloWorldController(helloWorldService);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Hello World
 *     responses:
 *       200:
 *         description: haha
 */
router.get("/world", (req, res) => helloWorldController.sendHelloWorld(req, res));

/**
 * @swagger
 * /world:
 *   post:
 *     summary: Created Hello World
 *     responses:
 *       200:
 *         description: hahaha
 */
router.post("/world", (req, res) => helloWorldController.postHelloWorld(req, res));

export default router;
