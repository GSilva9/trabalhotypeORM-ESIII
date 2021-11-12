import { response, Router } from 'express';
import { getCustomRepository, getRepository } from 'typeorm';
import EstablishmentRepository from '../repositories/EstablishmentRepository';
import { validate } from 'class-validator';
// import Product from '../models/Product';
import Estabelishment from '../models/Estabelishment';

const estabelishmentRouter = Router();
const establishmentRepository = async () => getCustomRepository(EstablishmentRepository);

estabelishmentRouter.get('/', async (req, res) => {   
    return res.json((await (await establishmentRepository()).find()));
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
