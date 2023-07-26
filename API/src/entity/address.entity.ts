import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "user_address" })
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  street?: string;

  @Column({ nullable: true })
  suite?: string;

  @Column({ nullable: true })
  city?: string;

  @Column({ nullable: true })
  zipcode?: string;
}
