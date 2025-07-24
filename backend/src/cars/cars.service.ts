import { Injectable, NotFoundException, ConflictException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Cars, CarStatus } from "./cars.entity";
import { CarsDTO } from "./dto/cars.dto";
import { UpdateCarDto } from "./dto/updateCar.dto";


@Injectable()
export class CarsService{
    constructor(
        @InjectRepository(Cars)
        private carsRepository: Repository<Cars>
    ){}

    async create(createCarsDto: CarsDTO): Promise<Cars>{
        const alreadyExistingCar = await this.carsRepository.findOne({where: {plate: createCarsDto.plate}})

        if(alreadyExistingCar){
            throw new ConflictException('Esse carro já existe no sitema')
        }

        const newCar = await this.carsRepository.create(createCarsDto)
        return await this.carsRepository.save(newCar)
    }

    async finAll(status?: CarStatus, search?: string): Promise<Cars[]>{

        const queryBuilder = this.carsRepository.createQueryBuilder('cars')

        if(status){
            queryBuilder.andWhere('cars.status = :status', {status})
        }

        if(search){
            queryBuilder.andWhere(
                '(LOWER(cars.brand) LIKE LOWER(:serch) OR' +
                'LOWER(cars.model) LIKE LOWER(:search) OR' +
                'LOWER(cars.plate) LIKE LOWER(:search))',
                {search: `%${search}`}
            )
        }

        return queryBuilder.orderBy('cars.createAt').getMany();
    }

    async findOne(id: string): Promise<Cars>{

        const car = await this.carsRepository.findOne({where: {id}})


        if(!car){
            throw new NotFoundException('Carro não encontrado')
        }

        return car
    }

    async remove(id: string): Promise<void>{
        const carToDelete = await this.carsRepository.findOne({where: {id}})

        if(!carToDelete){
            throw new NotFoundException("Carro não encontrado")
        }

        if(carToDelete.status === CarStatus.RESERVED){
            throw new BadRequestException('Não é possível remover um carro que está reservado')
        }

        this.carsRepository.remove(carToDelete)
    }


    async updateStatus(id: string, status: CarStatus): Promise<Cars>{
        const carToUpdate = await this.carsRepository.findOne({where: {id}})

        if(!carToUpdate){
            throw new NotFoundException('Carro não encontrado')
        }

        carToUpdate.status = status
        return this.carsRepository.save(carToUpdate)
    }

}