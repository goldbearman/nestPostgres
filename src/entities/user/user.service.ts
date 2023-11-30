import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "@entities/user/user.entity";
import {Repository} from "typeorm";
// import bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';

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
}
