import { response, Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import EstablishmentRepository from '../repositories/EstablishmentRepository';
import { validate } from 'class-validator';
// import Product from '../models/Product';
import Estabelishment from '../models/Estabelishment';

const estabelishmentRouter = Router();
const establishmentRepository = async () => getCustomRepository(EstablishmentRepository);

estabelishmentRouter.get('/', async (req, res) => {
    let { id, name, doc, site, contributors, sumOfProducts, created_At, updated_At } = req.query;
    if (id) {
        return res.json({ estabelishment: (await (await establishmentRepository()).findById(id)) });
    };

    //   if (code) {
    //     return res.json({product: (await (await EstablishmentRepository()).findByCode(code))});
    //   };

    let data: any = {};

    //   let buyPrice = req.body.buyPrice ? Number(req.body.buyPrice)*100 : undefined;
    //   let sellPrice = req.body.sellPrice ? Number(req.body.sellPrice)*100 : undefined;

    //   lovers = lovers ? <any> Number(lovers) : undefined;

    //   if (code) data.code = code;
    //   if (description) data.description = description;
    //   if (lovers) data.lovers = lovers;

    //   if (buyPrice) data.buyPrice = buyPrice;
    //   if (sellPrice) data.sellPrice = sellPrice;

    if (Object.keys(data).length > 0) {
        var estabelishment = await (await establishmentRepository()).find({ where: data });
    }

    //   if (!products) var products = await (await EstablishmentRepository()).find();

    //   if (__quantity) {
    //     products = products.filter((_, i) => i < Number(__quantity));
    //   };

    res.json({ estabelishment });
});

estabelishmentRouter.post('/', async (request, response) => {
    try {
        const { name, doc, site, contributors, sumOfProducts } = request.body;
        const repo = getRepository(Estabelishment)
        // buyPrice = Number(buyPrice) *100;
        // sellPrice = Number(sellPrice) *100;
        // if (tags) tags = JSON.parse(tags);
        // if (lovers) lovers = parseInt(lovers);
        const estabelecimento = repo.create({
            name,
            doc,
            site,
            contributors,
            sumOfProducts
        });

        const errors = await validate(estabelecimento)

        if (errors.length === 0) {
            const res = await repo.save(estabelecimento);
            return response.status(201).json(res);
        } else {

            response.status(400).json(errors)
        }


    } catch (err) {
        return response.status(400).json({ Erro: err.message });
    }
});

export default estabelishmentRouter;
