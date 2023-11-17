import {Controller, Delete, Get, Param, Post, Put, Req, Res} from '@nestjs/common';

@Controller('user')
export class UserController {

    @Get('/')
    async getAllUsers(
        @Res() res: Response,
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
        @Res() res: Response,
    ) {
        const userData = await this.userService.getUserData(id)

        return res.send({
            status: 'ok',
            data: userData,
        })
    }

    @Post('/')
    async createUser(
        @Req() req: Request,
        @Res() res: Response,
    ) {
        await this.userService.createUser(req.body)
        return res.send({ status: 'ok' })
    }

    @Put('/:id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: UpdateUserDto,
        @Res() res: Response,
    ) {
        this.userService.updateUserData(id, body)
        return res.send({ status: 'ok' })
    }

    @Delete('/:id')
    async deleteUser(
        @Param('id', ParseIntPipe) id: number,
        @Res() res: Response,
    ) {
        this.userService.deleteUser(id)
        return res.send({ status: 'ok' })
    }
}
