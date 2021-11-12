import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import {IsPositive, Min, MinLength} from 'class-validator';
@Entity()
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  code: number;

  @Column()
  @MinLength(10, {message: "A descrição precisa ter pelo menos 10 caracteres"})
  description: string;

  @Column()
  @IsPositive({message: "O valor precisa ser maior que zero"})
  buyPrice: number;

  @Column()
  @IsPositive({message: "O valor precisa ser maior que zero"})
  sellPrice: number;

  // @Column({ array: true })
  // tags: Array<string>;

  @Column()
  lovers: number;
}
