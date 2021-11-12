import { EntityRepository, Repository } from 'typeorm';
import Estabelishment from '../models/Estabelishment';

@EntityRepository(Estabelishment)
export default class EstablishmentRepository extends Repository<Estabelishment> {
    public async findById(id) {
        return this.find({ where: { id } })
    };

    public async findByDoc(doc) {
        return this.find({ where: { doc } });
    };

    // public async findBySite(site) {
    //     return this.find({ where: { site } });
    // };
    // public async deleteById(id) {
    //     return this.delete({ id });
    // };

    // public async deleteByDoc(doc) {
    //     let entity = await this.findByDoc(doc);
    //     return this.delete(entity[0]);
    // };
    
    // public async deleteBySite(site) {
    //     let entity = await this.findBySite(site);
    //     return this.delete(entity[0]);
    // };
};