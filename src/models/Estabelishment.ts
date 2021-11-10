import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Product from './Product';

import {IsFQDN} from 'class-validator';

@Entity()
export default class Estabelishment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    doc: number;

    @Column({ unique: true })
    @IsFQDN()
    site: string;

    @ManyToMany(type => Product)
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
