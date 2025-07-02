import { Reservations } from "src/reservations/reservations.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

export enum CarStatus{
    AVAILABLE = 'available',
    RESERVED = 'reserved',
    MAINTENANCE = 'maintenance',
    INACTIVE = 'inactive',
}

@Entity('cars')
export class Cars{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    brand: string;

    @Column()
    model: string;

    @Column({unique: true})
    plate: string;

    @Column()
    year: number;

    @Column({type: 'decimal', precision: 10, scale: 2, default: 0})
    currentKms: number;

    @Column({
        type: 'enum',
        enum: CarStatus,
        default: CarStatus.AVAILABLE,
    })
    status: CarStatus;

    @Column({nullable: true})
    photoURL: string;

    @Column({type: 'text', nullable: true})
    description: string;

    @Column({default: 0})
    totalReservations: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Reservations, (reservation) => reservation.car)
    reservations: Cars[]


    isAvailable() : boolean {
        return this.status === CarStatus.AVAILABLE;
    }

    getFullName(): string {
        return `${this.brand} ${this.model} ${this.year}`
    }

    incrementReservationColumn() : void {
        this.totalReservations += 1;
    }
}