import { response, Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import ProductRepository from '../repositories/ProductRepository';
import { validate } from 'class-validator';
import Product from '../models/Product';

const productRouter = Router();
const productRepository = async () => getCustomRepository(ProductRepository);

productRouter.get('/', async (req, res) => {
  let { code, description, lovers, id, __quantity } = req.query;
  
  if (id) {
    return res.json({product: (await (await productRepository()).findById(id))});
  };
  
  if (code) {
    return res.json({product: (await (await productRepository()).findByCode(code))});
  };
  
  let data: any = {};
  
  let buyPrice = req.body.buyPrice ? Number(req.body.buyPrice)*100 : undefined;
  let sellPrice = req.body.sellPrice ? Number(req.body.sellPrice)*100 : undefined;

  lovers = lovers ? <any> Number(lovers) : undefined;

  if (code) data.code = code;
  if (description) data.description = description;
  if (lovers) data.lovers = lovers;

  if (buyPrice) data.buyPrice = buyPrice;
  if (sellPrice) data.sellPrice = sellPrice;

  if (Object.keys(data).length > 0) {
    var products = await (await productRepository()).find({ where: data });
  }

  if (!products) var products = await (await productRepository()).find();

  if (__quantity) {
    products = products.filter((_, i) => i < Number(__quantity));
  };

  res.json({products});
});

productRouter.post('/', async (request, response) => {
  try {
    const { buyPrice, code, description, lovers, sellPrice } = request.body;
    const repo = getRepository(Product)
    // buyPrice = Number(buyPrice) *100;
    // sellPrice = Number(sellPrice) *100;
    // if (tags) tags = JSON.parse(tags);
    // if (lovers) lovers = parseInt(lovers);
    const produto = repo.create({
      buyPrice,
      code,
      description,
      lovers,
      sellPrice
    });

    const errors = await validate(produto)

    if(errors.length === 0){
      const res = await repo.save(produto);
      return response.status(201).json(res);
    }else{

      response.status(400).json(errors)
    }
    

  } catch (err) {
    return response.status(400).json({ Erro: err.message });
  }
});

export default productRouter;
