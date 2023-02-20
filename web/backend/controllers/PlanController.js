import express from "express";
import shopify from "../../shopify.js";
import  { DataType } from '@shopify/shopify-api';
import db from '../models/index.js';
const {Plan} = db;

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const data = await db.Plan.findAll({
      raw: true,
      order: [['id', 'ASC']],
    });
    res.json(data)
  } catch (error) {
    console.log("🚀 ~ file: ShopController.js:33 ~ router.get ~ error", error)
    res.status(404).json({message: 'Not found'})
  }
});

router.post('/change', async (req, res) => {
  try {
    const session = res.locals.shopify.session;
    const body = req.body;
    const client = new shopify.api.clients.Rest({session});
    const plan = await db.Plan.findOne({
      where: { name: body.pricing_plan },
      raw: true,
    });

    if (!plan) {
      throw new Error('Not found');
    }

    if (plan.price) {
      const data = await client.post({
        path: 'recurring_application_charges',
        data: {
          recurring_application_charge: {
            name: plan.name,
            price: plan.price,
            return_url: `${process.env.HOST}/auth?shop=${session.shop}&host=${body.host}`,
            test: process.env.DEBUG_MODE_TEST_PLAN == 'true',
          },
        },
        type: DataType.JSON,
      });
      const confirmation_url = data?.body?.recurring_application_charge?.confirmation_url;
      res.json({ confirmation_url });
    } else {
      await db.Shop.update(
        { pricing_plan: plan.name, start_plan_date: new Date() },
        { where: { shopify_domain: session.shop } }
      );
      const shop = await db.Shop.findOne({
        where: { shopify_domain: session.shop },
        raw: true,
      });

      try {
        if (shop.charge_id) {
          await client.delete({
            path: 'recurring_application_charges/' + shop.charge_id,
          });
        }
      } catch (error) {
        console.log(
          '🚀 ~ file: PlanController.js ~ line 68 ~ router.post ~ error',
          error
        );
      }

      shop.reviews = 0;
      shop.plan_reviews = plan?.reviews || 0;
      res.json(shop);
    }
  } catch (error) {
    console.log(
      '🚀 ~ file: PlanController.js ~ line 54 ~ router.post ~ error',
      error
    );
    res.status(404).json({message: 'Not found'})
  }
});



export default router;
