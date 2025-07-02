import {
  IsEmail,
  IsEnum,
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
} from 'class-validator';
import { UserRole } from '../user.entity';

export class CreateUserDTO {
  @IsEmail({}, { message: 'Forneça um e-mail válido' })
  @IsNotEmpty({ message: 'O campo e-mailé obrigatório' })
  email: string;

  @IsString({ message: 'Forneça uma string para o nome' })
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @MinLength(4, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @IsString({ message: 'A senha deve ser uma string' })
  @IsNotEmpty({ message: 'O campo é obrigatório' })
  @MinLength(5, { message: 'A senha deve ter no mínimo 5 caracteres' })
  password: string;

  @IsEnum(UserRole, { message: 'O perfil deve ser admin, manager ou employee' })
  @IsOptional()
  role?: UserRole = UserRole.EMPLOYEE;
}
