import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsEnum,
  IsOptional,
  IsUrl,
  Min,
  Max,
} from 'class-validator';
import { CarStatus } from '../cars.entity';

export class CarsDTO {
  @IsString({ message: 'A marca do veículo deve ser uma string' })
  @IsNotEmpty({ message: 'Campo de marca é obrigatório' })
  brand: string;

  @IsNotEmpty({ message: 'Campo de modelo é obrigatório' })
  @IsString({ message: 'O modelo do carro deve ser uma string' })
  model: string;

  @IsNotEmpty({ message: 'A Placa é obrigatória' })
  @IsString({ message: 'A placa do carro deve ser uma string' })
  plate: string;

  @IsNotEmpty({ message: 'O ano do carro é obrigatório' })
  @IsNumber({}, { message: 'O ano do carro dever ser um numero' })
  @Min(2008, { message: 'O ano do carro deve ser maior que 2008' })
  @Max(2025, { message: 'O ano do carro deve ser menor que 2025' })
  year: number;

  @IsOptional()
  @IsNumber({}, { message: 'A quilometragem deve ser um número' })
  @Min(0, { message: 'A quilometragem não pode ser negativa' })
  currentKms?: number = 0;

  @IsOptional()
  @IsEnum(CarStatus, {
    message:
      'O status do carro deve ser available, reserved, maintenance ou inactive',
  })
  status?: CarStatus = CarStatus.AVAILABLE;

  @IsOptional()
  @IsString({ message: 'A foto deve estar no formato de string' })
  @IsUrl({}, { message: 'A string deve ser uma URL válida' })
  photoURL?: string;

  @IsOptional()
  @IsString({ message: 'A descrição deve ser uma string' })
  description?: string;
  
  @IsOptional()
  @IsString({ message: 'As notas devem ser uma string' })
  notes?: string;

  

}
