import {E_Gender} from "@entities/user/type";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class UpdateUserDto{
    @IsEmail()
    email:string;

    @IsString()
    nameFirst:string;

    @IsString()
    nameLast:string;

    @IsNotEmpty()
    gender:E_Gender;
}