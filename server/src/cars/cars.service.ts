import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Equal, ILike, MoreThanOrEqual, Repository } from "typeorm";
import { Car } from "./interfaces/car";
import {
  CarCreateDto,
  CarPriceUpdateDto,
  CarResponseDto,
  CarUpdateDto,
} from "./dtos/car.dto";
import { CarQueryDto } from "./dtos/car-query.dto";

@Injectable()
export class CarsService {
  constructor(
    @Inject("CAR_REPOSITORY") private carRepository: Repository<Car>
  ) {}

  async getAllCars(query: CarQueryDto): Promise<CarResponseDto[]> {
    const { brand = "", year = 1, color = "" } = query;

    const car = await this.carRepository.find({
      where: {
        brand: ILike(`%${brand}%`),
        year: MoreThanOrEqual(year),
        color: ILike(`%${color}%`),
      },
    });

    return car;
  }

  addNewCar(car: CarCreateDto): Promise<CarResponseDto> {
    return this.carRepository.save(car);
  }

  async getCarById(id: string): Promise<CarResponseDto> {
    const car = await this.carRepository.findOne({
      where: { id },
    });

    if (!car) {
      throw new NotFoundException(`The car with ID ${id} has not been found.`);
    }

    return car;
  }

  async updateCar(
    id: string,
    updateData: CarUpdateDto
  ): Promise<CarResponseDto> {
    await this.getCarById(id);

    try {
      await this.carRepository.save({
        id,
        ...updateData,
      });
    } catch (error) {
      throw new BadRequestException(
        `Error while editing data of the car with ID ${id}`
      );
    }

    return this.getCarById(id);
  }

  async deleteCar(id: string): Promise<void> {
    await this.carRepository.softDelete(id);
  }

  async updateCarPrice(id: string, price: number): Promise<CarResponseDto> {
    await this.getCarById(id);

    try {
      await this.carRepository.save({
        id,
        price,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid ID or Price entered`);
    }

    return this.getCarById(id);
  }

  async updateCarAvalibility(
    id: string,
    isAvailable: boolean
  ): Promise<CarResponseDto> {
    const car = await this.getCarById(id);

    car.isAvailable = isAvailable;

    await this.carRepository.save(car);

    // try {
    //   await this.carRepository.save({
    //     id,
    //     isAvailable,
    //   });
    // } catch (error) {
    //   throw new BadRequestException(`Invalid ID or avalibality status entered`);
    // }

    return this.getCarById(id);
  }
}
