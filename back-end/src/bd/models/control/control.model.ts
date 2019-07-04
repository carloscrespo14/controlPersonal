import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Persona } from '../personas/persona.model';

@Entity({ name: 'Control', database: 'main' })
export class Control {
    @PrimaryColumn({ type: 'varchar', length: 2, nullable: false })
    idControl: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    entrada: string;
    @Column({ type: 'varchar', length: 20, nullable: false })
    salida: string;
    @OneToMany((type) => Persona, (persona) => persona.idPersona)
    persona: Persona[];
}
