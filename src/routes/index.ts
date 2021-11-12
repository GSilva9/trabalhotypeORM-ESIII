import { Router } from 'express';
import productRouter from './product.routes';
import estabelishment from './estabelishment.routes';

const routes = Router();

routes.use('/products', productRouter);
routes.use('/estabelishment', estabelishment);

export default routes;
