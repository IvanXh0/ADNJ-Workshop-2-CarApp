import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarsService } from "./cars.service";
import {
  CarCreateDto,
  CarPriceUpdateDto,
  CarResponseDto,
  CarUpdateDto,
} from "./dtos/car.dto";
import { CarQueryDto } from "./dtos/car-query.dto";

@ApiTags("Cars")
@Controller("cars")
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @ApiResponse({
    status: 200,
    description: "All the cars in the inventory",
  })
  @Get()
  @UsePipes(ValidationPipe)
  getAllCars(@Query() query: CarQueryDto): Promise<CarResponseDto[]> {
    return this.carsService.getAllCars(query);
  }

  @ApiResponse({
    status: 201,
    description: "The added car to the inventory",
  })
  @UsePipes(ValidationPipe)
  @Post()
  addNewCar(@Body() car: CarCreateDto): Promise<CarResponseDto> {
    return this.carsService.addNewCar(car);
  }

  @ApiResponse({
    status: 200,
    description: "The car found by ID",
  })
  @ApiNotFoundResponse({
    status: 404,
    description: "Car cannot be found",
  })
  @Get(":id")
  getCarById(@Param("id") id: string): Promise<CarResponseDto> {
    return this.carsService.getCarById(id);
  }

  @ApiResponse({
    status: 200,
    description: "Updated car properties",
  })
  @Put(":id")
  updateCar(
    @Param("id") id: string,
    @Body() updateData: CarUpdateDto
  ): Promise<CarResponseDto> {
    return this.carsService.updateCar(id, updateData);
  }

  @ApiResponse({
    status: 200,
    description: "Successfully deleted car",
  })
  @Delete(":id")
  deleteCar(@Param("id") id: string): Promise<void> {
    return this.carsService.deleteCar(id);
  }

  @ApiResponse({
    status: 200,
    description: "Updated car price",
  })
  @Patch(":id/price/:price")
  updateCarPrice(
    @Param("id") id: string,
    @Param("price", ParseIntPipe) price: number
  ) {
    return this.carsService.updateCarPrice(id, price);
  }

  @ApiResponse({
    status: 200,
    description: "The availibility of the car",
  })
  @Patch(":id/isAvailable/:isAvailable")
  updateCarAvalibility(
    @Param("id") id: string,
    @Param("isAvailable", ParseBoolPipe) isAvailable: boolean
  ) {
    return this.carsService.updateCarAvalibility(id, isAvailable);
  }
}
