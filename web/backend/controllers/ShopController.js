import express from "express";
import shopify from "../../shopify.js";
import db from '../models/index.js';
const {Shop} = db;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    let shop = await Shop.findOne({where: {
      shopify_domain: res.locals.shopify.session.shop
    }, raw: true})

    if(!shop){
      const shopData = await shopify.api.rest.Shop.all({
        session: res.locals.shopify.session,
      });

      await db.Shop.create({
        shopify_domain: res.locals.shopify.session.shop,
        access_token: res.locals.shopify.session.accessToken,
        domain: shopData[0].domain || '',
        shop_id: shopData[0].id || '',
      });

      shop = await Shop.findOne({where: {
        shopify_domain: res.locals.shopify.session.shop
      }, raw: true})
    }



    const data = await shopify.api.webhooks.register({
      session,
    })
    console.log("🚀 ~ file: ShopController.js:37 ~ router.get ~ data", data)

    res.json(shop)
  } catch (error) {
    console.log("🚀 ~ file: ShopController.js:33 ~ router.get ~ error", error)
    res.status(404).json({message: 'Not found'})
  }
});

router.get('/themes', async (req, res) => {
  try {
    const session = res.locals.shopify.session;

    const themeData = await shopify.api.rest.Theme.all({
      session,
    });
    res.json(themeData)
  } catch (error) {
    console.log("🚀 ~ file: ShopController.js:50 ~ router.get ~ error", error)
    res.status(404).json({message: 'Not found'})
  }
});



export default router;
