import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Product from './Product';
// import EncryptionTransformer from 'typeorm-encrypted/lib/transformers';
import {EncryptionTransformer} from 'typeorm-encrypted/lib/transformer';

import {IsFQDN} from 'class-validator';

@Entity()
export default class Estabelishment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer({
          key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
          algorithm: 'aes-256-cbc',
          ivLength: 16,
          iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
      })
    name: string;

    @Column({ unique: true })
    doc: number;

    @Column({ unique: true })
    @IsFQDN()
    site: string;

    @ManyToMany(type => Product, {cascade:true, eager:true})
    @JoinTable()
    products: Product[]; //Verificar se realmente é um array

    @Column()
    contributors: number;

    @Column()
    sumOfProducts: number;

    @CreateDateColumn()
    created_At: Date;
    
    @UpdateDateColumn()
    updated_At: Date;
    
};
