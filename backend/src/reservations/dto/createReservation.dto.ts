import {IsString, IsUUID, IsDateString, Min, IsNumber, IsEnum, IsNotEmpty, IsOptional} from 'class-validator'
import { ReservationStatus } from '../reservations.entity'

export class CreateReservationDTO{
    @IsNotEmpty({message: 'A data de inicio da reserva é obrigatória'})
    @IsDateString({}, {message:'A data de inicio da reserva deve ser uma Data'})
    startDate: Date

    @IsNotEmpty({message: 'A data final da reserva é obrigatório'})
    @IsDateString({},{message: 'A data de término deve ser uma Date'})
    endDate: Date

    @IsOptional()
    @IsString({message: 'A finalidade do do veículo deve ser uma string'})
    purpose?: string;

    @IsOptional()
    @IsNumber({},{message: 'A quilometragem inicial deve ser um numero'})
    @Min(0,{message: "A quilometragem inicial  deve ser maior que 0"})
    startKm: number;



}