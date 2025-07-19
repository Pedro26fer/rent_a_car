import { UserService } from './user.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from './user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Apenas admnistradores podem criar outros usuários

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.ADMIN)
  async create(@Body() createUserDto: CreateUserDTO) {
    return this.userService.create(createUserDto);
  }

  // Apenas admnistradores e gerentes podem listar os usuários
  @Get()
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    // Employers só podem listar o proprio perfil

    if (req.user.role === UserRole.EMPLOYEE && req.user.id !== id) {
      throw new Error('ACESSO NEGADO');
    }

    return this.userService.findById(id);
  }

  @Patch(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateData: { isActive: boolean },
  ) {
    return this.userService.updateStatusUser(id, updateData.isActive);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async remove(@Param('id') id: string) {
    await this.userService.removeUser(id);
    return { message: 'O usuário foi removido com sucesso!' };
  }

  @Get('stats/overview')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.MANAGER)
  async getStats() {
    return this.userService.getUsersStats();
  }
}
