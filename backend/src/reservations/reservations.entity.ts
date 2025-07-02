import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'

import { User } from 'src/users/user.entity'
import { Cars } from 'src/cars/cars.entity'

export enum ReservationStatus{
    PENDING = 'pending',
    ACTIVE = 'active',
    COMPLETED = 'completed',
    CANCELLED = 'cancelled' 
}

@Entity('reservations')
export class Reservations{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column({
        type: 'enum',
        enum: ReservationStatus,
        default: ReservationStatus.ACTIVE
    })
    status: ReservationStatus;

    @Column({type: 'text', nullable: true})
    purpose: string;

    @Column({type: 'text', nullable: true})
    notes: string;

    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    startKm: number;
    
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: true})
    endKm: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, (user) => user.reservations, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'userId'})
    user: User;

    @Column()
    userId: string

    @ManyToOne(() => Cars, (car) => car.reservations, {onDelete: 'CASCADE'})
    @JoinColumn({name: 'carId' })
    car: Cars

    @Column()
    carId: string; 



    isActive(): Boolean {
        return this.status === ReservationStatus.ACTIVE
    }

    canBeCanceled() : Boolean {
        return this.status === ReservationStatus.PENDING;
    }

    getDurationInDays() : number{
        const duration = Math.abs(this.endDate.getTime() - this.startDate.getTime())
        return Math.ceil(duration / (1000 * 60 * 60 * 24))
    }

    getKmsTravelled(): number | null{
        if(this.startKm && this.endKm){
            return this.startKm - this.endKm
        }
        return null
    }

    verifingConclictsInReservations(startDate: Date, ednDate: Date) : boolean {
        return(
            (startDate <= this.endDate && this.endDate >= this.startDate) &&
            (this.status === ReservationStatus.ACTIVE || this.status === ReservationStatus.PENDING)
        )

    }


}