import {Module} from '@nestjs/common';
import {UserModule} from "@entities/user/user.module";
import {TypeOrmModule} from "@db/typeorm.module";
// import {ConfigModule} from "@nestjs/config";
import {ConfigModule} from "./config.module";
import { config } from "dotenv";
import {UserController} from "@entities/user/user.controller";


config();

@Module({
    imports: [
        // ConfigModule,
        ConfigModule,
        TypeOrmModule,
        UserModule,
    ],
    controllers: [UserController],
})
export class AppModule {
}
