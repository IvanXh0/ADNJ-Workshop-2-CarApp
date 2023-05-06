import { Module } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CarsController } from "./cars.controller";
import { carProviders } from "./cars.providers";
import { DatabaseModule } from "../database/database.module";

@Module({
  imports: [DatabaseModule],
  providers: [...carProviders, CarsService],
  controllers: [CarsController],
})
export class CarsModule {}
