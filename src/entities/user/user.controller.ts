import {
    Controller,
    Delete,
    Get,
    Body,
    Param,
    Post,
    Put,
    Req,
    Res,
    UseInterceptors,
    UploadedFile,
    ParseIntPipe
} from '@nestjs/common';
import {FileInterceptor} from "@nestjs/platform-express";
import {ok} from "assert";
import {Express, Request, Response} from "express";
import {UserService} from "@entities/user/user.service";
import {UpdateUserDto} from "@entities/user/updateUser.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('/')
    async getAllUsers(
        @Res() res
    ) {
        const users = await this.userService.getAllUsers()
        return res.send({
            status: 'ok',
            data: users,
        })
    }


    @Get('/:id')
    async getUser(
        @Param('id', ParseIntPipe) id: number,
        // @Param() params: any,
        @Res() res: Response,
    ) {
        const userData = await this.userService.getUserData(id);

        delete userData.password;

        return res.send({
            status: 'ok',
            data: userData,
        })
    }

    @Post('/')
    @UseInterceptors(FileInterceptor(''))
    async createUser(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.userService.createUser(req.body);
        console.log(req.body)
        return res.send({
            status: 'ok',
        })
    }

    @Put('/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto,
        @Res() res: Response,
    ) {
        await this.userService.updateUserData(id, body)
        return res.send({status: 'ok'})
    }

    //
    // @Delete('/:id')
    // async deleteUser(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Res() res: Response,
    // ) {
    //     this.userService.deleteUser(id)
    //     return res.send({ status: 'ok' })
    // }
}


// {
//     "status": "ok",
//     "data": {
//     "id": {
//         "id": "1"
//     }
// }
// }