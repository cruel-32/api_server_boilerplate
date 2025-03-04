
import { Router } from "express";
import helloWorldRoutes from '@/modules/HelloWorld/routes/HelloWorldRoutes'

const router = Router();
router.use(helloWorldRoutes);

router.get("/*", (req, res) => {
  res.status(404).send('Not found');
});
router.post("/*", (req, res) => {
  res.status(404).send('Not found');
});
router.put("/*", (req, res) => {
  res.status(404).send('Not found');
});
router.delete("/*", (req, res) => {
  res.status(404).send('Not found');
});


export default router;
