import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'Seguridad', database: 'main' })
export class Seguridad {
    @PrimaryColumn({ type: 'varchar', length: 10, nullable: false })
    userId: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    email: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    password: string;
}
