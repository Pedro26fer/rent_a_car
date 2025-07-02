import {IsString, IsUUID, IsDateString, Min, IsNumber, IsEnum, IsNotEmpty} from 'class-validator'

export class CreateReservationDTO{
    @IsNotEmpty({message: 'A data de inicio da reserva é obrigatória'})
    @IsDateString({}, {message:'A data de inicio da reserva deve ser uma Data'})
    startDate: Date

    
    

}