import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Control } from '../control/control.model';
import { Rol } from '../rol';

@Entity({ name: 'Personas', database: 'main' })
export class Persona {
    @PrimaryColumn({ type: 'varchar', length: 60, nullable: false })
    idPersona: string; /* cadena compuesta por correo y fecha de registro */
    @Column({ type: 'varchar', length: 20, nullable: false })
    correo: string;
    @Column({ type: 'varchar', length: 30, nullable: false })
    nombre: string;
    @Column({ type: 'varchar', length: 30, nullable: false })
    apellido: string;
    @ManyToOne((type) => Rol, (rol) => rol.idRol)
    rol: Rol;
    @ManyToOne((type) => Control, (control) => control.idControl)
    control: Control;

}
