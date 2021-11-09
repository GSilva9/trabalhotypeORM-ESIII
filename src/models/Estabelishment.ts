import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Product from './Product';

@Entity()
export default class Estabelishment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    doc: number;

    @Column({ unique: true })
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
