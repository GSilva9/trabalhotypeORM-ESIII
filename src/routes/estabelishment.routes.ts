import { response, Router } from 'express';
import { getConnection, getCustomRepository, getRepository } from 'typeorm';
import EstablishmentRepository from '../repositories/EstablishmentRepository';
import { validate } from 'class-validator';
// import Product from '../models/Product';
import Estabelishment from '../models/Estabelishment';

const estabelishmentRouter = Router();
const establishmentRepository = async () => getCustomRepository(EstablishmentRepository);

estabelishmentRouter.get('/', async (req, res) => {

    return res.json((await (await establishmentRepository()).find({ cache: { id: 'listEstablishment', milliseconds: 10000 } })));
});

estabelishmentRouter.post('/', async (request, response) => {
    try {
        const { name, doc, site, contributors, sumOfProducts, products } = request.body;
        //Para remover o cache quando der post em Establishment
        await getConnection().queryResultCache?.remove(['listEstablishment'])
        const repo = getRepository(Estabelishment)
        const estabelecimento = repo.create({
            name,
            doc,
            site,
            contributors,
            sumOfProducts,
            products
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
