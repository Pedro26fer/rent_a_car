import * as bcrypt from 'bcryptjs'
import {Injectable, NotFoundException, ConflictException, Param} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDTO } from './dto/createUser.dto'
import { User } from './user.entity'

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    async create(createdUserDto: CreateUserDTO): Promise<User>{

        const isThereThisUser = await this.userRepository.findOne({where: {email: createdUserDto.email}})

        if(isThereThisUser){
            throw new ConflictException('#EMAIL JÁ UTILIZADO')
        }

        const saltsHash = 10
        const hashedPassowrd = await bcrypt.hash(createdUserDto.password, saltsHash)

        const user = this.userRepository.create({
            ...createdUserDto,
            password: hashedPassowrd
        })

        const savedUser = await this.userRepository.save(user)

        const {password, ...result} = savedUser
        return result as User
    }

    async findAll(): Promise<User[]>{
        const users = await this.userRepository.find({
            select:['id', 'email', 'name', 'role', 'isActive', 'createdAt', 'updatedAt'],
            order: {createdAt: 'DESC'}
        })
        return users
    }

    async findById(id: string): Promise<User>{
        const foundUser = await this.userRepository.findOne({where: {id}})

        if(!foundUser){
            throw new NotFoundException
        }

        return foundUser
    }

    
 
    

}