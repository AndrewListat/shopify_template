import express from "express";
const router = express.Router();

router.get('/count', async (req, res) => {
  res.json({
    status: true,
    count: 444
  })
});

export default router;

