import express from "express";
import fs from 'fs'
const routers  = express.Router();

fs.readdirSync('./backend/controllers').forEach(file => {
  if(file != 'IndexController.js'){
    const path = file.replace('Controller.js', '').toLocaleLowerCase();
    import(`./${file}`).then(module => {
      routers.use(`/${path}`, module.default);
    })
  }
});

export default routers;