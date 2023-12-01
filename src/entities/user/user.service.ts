import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@entities/user/user.entity";
import {Repository} from "typeorm";
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';
import {UpdateUserDto} from "@entities/user/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    public async createUser(userData: any) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = this.userRepository.create({...userData, password: hashedPassword});
        return await this.userRepository.save(newUser);
    }

    async getUserData(id: number) {
        return await this.userRepository.findOne({
            where: {id},
            select: [
                'nameFirst', 'nameLast', 'email', 'gender'
            ]
        })
    }

    async getAllUsers() {
        return await this.userRepository.find({
            select: [
                'nameFirst', 'nameLast', 'email', 'gender'
            ]
        });
    }

    async updateUserData(id: number, body: UpdateUserDto) {
        return await this.userRepository.update({id}, body)

    }

}
