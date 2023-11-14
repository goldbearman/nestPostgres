import {Module} from '@nestjs/common';
import {UserModule} from "@entities/user/user.module";
import {TypeOrmModule} from "@db/typeorm.module";
import {ConfigModule} from "@nestjs/config";
// import {ConfigModule} from "./config.module";

@Module({
    imports: [
        // ConfigModule,
        ConfigModule.forRoot({ envFilePath: `${process.env.NODE_ENV}.env` }),
        TypeOrmModule,
        UserModule,
    ],
})
export class AppModule {
}
