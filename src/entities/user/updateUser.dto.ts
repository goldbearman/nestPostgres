import {E_Gender} from "@entities/user/type";
import {IsEmail, IsEnum, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    nameFirst:string;

    @IsString()
    nameLast:string;

    @IsEnum(E_Gender)
    gender:E_Gender;
}