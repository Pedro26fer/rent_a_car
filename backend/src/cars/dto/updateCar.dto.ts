import {PartialType} from '@nestjs/mapped-types'
import { Cars } from '../cars.entity'

export class UpdateCarDto extends PartialType(Cars){}