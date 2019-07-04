import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Persona } from '../personas/persona.model';

@Entity({ name: 'Rol', database: 'main' })
export class Rol {
    @PrimaryColumn({ type: 'varchar', length: 2, nullable: false })
    idRol: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    nombreRol: string;
    @OneToMany((type) => Persona, (persona) => persona.idPersona)
    persona: Persona[];
}
