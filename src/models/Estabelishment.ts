import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export default class Estabelishment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column({ unique: true })
    doc: number;

    @Column()
    site: string;

    @Column()
    contributors: number;

    @Column()
    sumOfProducts: number;

    @CreateDateColumn()
    update_At: Date;
}
