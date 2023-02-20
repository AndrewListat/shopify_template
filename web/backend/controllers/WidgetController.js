import express from "express";
import shopify from "../../shopify.js";
import db from '../models/index.js';
const {Widget} = db;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    let widget = await Widget.findOne({where: {
      shopify_domain: res.locals.shopify.session.shop
    }, raw: true})
    if(!widget){
      await Widget.create({
        shopify_domain: res.locals.shopify.session.shop,
      });
      widget = await Widget.findOne({where: {
        shopify_domain: res.locals.shopify.session.shop
      }, raw: true})
    }
    res.json(widget)
  } catch (error) {
    console.log("🚀 ~ file: ShopController.js:33 ~ router.get ~ error", error)
    res.status(404).json({message: 'Not found'})
  }
});

router.put('/:id', async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const widgetFind = await Widget.findOne({
      where: { shopify_domain: session?.shop },
      raw: true,
    });
    if (!widgetFind) {
      throw new Error('Not found');
    }

    await Widget.update(req.body, { where: { id: widgetFind.id } });
    res.json(await db.Widget.findOne({
      where: { shopify_domain: session?.shop },
      raw: true,
    }))
  } catch (error) {
    console.log("🚀 ~ file: WidgetController.js:45 ~ router.put ~ error", error)
    res.status(404).json({message: 'Not found'})
  }
});



export default router;
