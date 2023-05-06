import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CarQueryDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: "The brand of the car",
  })
  brand?: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @ApiPropertyOptional({
    type: Number,
    description: "The year the car was made",
  })
  year?: number;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({
    type: String,
    description: "The color of the car",
  })
  color?: string;
}
