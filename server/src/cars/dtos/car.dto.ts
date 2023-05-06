import { ApiProperty } from "@nestjs/swagger";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from "class-validator";
import { Car } from "../interfaces/car";
import { Type } from "class-transformer";

export class CarCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The brand of the car",
    example: "Opel",
  })
  brand: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The model of the car",
    example: "Astra H GTC",
  })
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: "The year the car was made",
    example: 2009,
  })
  year: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: "The price of the car",
    example: 35500,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The color of the car",
    example: "black",
  })
  color: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    description: "Is the car available",
    example: true,
  })
  isAvailable: boolean;
}

export class CarResponseDto extends CarCreateDto implements Car {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: "The ID of the car",
    example: "182u3128u3128eu12d18281d28",
  })
  id: string;
}

export class CarPriceUpdateDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    description: "The price of the car",
    example: 3500,
  })
  price: number;
}

export class CarUpdateDto extends CarCreateDto {}
