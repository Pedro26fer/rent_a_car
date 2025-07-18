import { UserService } from "./user.service";
import { CreateUserDTO } from "./dto/createUser.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import {Controller, Get, Post, Delete, Patch, Param, UseGuards, Request } from '@nestjs/common'
import { RolesGuard } from "src/common/guards/roles.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserRole } from "./user.entity";

