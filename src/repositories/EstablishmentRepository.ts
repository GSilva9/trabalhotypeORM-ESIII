import { EntityRepository, Repository } from 'typeorm';
import Product from '../models/Product';

@EntityRepository(Product)
export default class ProductRepository extends Repository<Product> {
    public async findById(id) {
        return this.find({ where: { id } })
    };

    public async findByDoc(doc) {
        return this.find({ where: { doc } });
    };

    public async findBySite(site) {
        return this.find({ where: { site } });
    };
    public async deleteById(id) {
        return this.delete({ id });
    };

    public async deleteByDoc(doc) {
        let entity = await this.findByDoc(doc);
        return this.delete(entity[0]);
    };
    
    public async deleteBySite(site) {
        let entity = await this.findBySite(site);
        return this.delete(entity[0]);
    };
};