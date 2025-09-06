import { BadRequestException, Injectable, Response } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterDTO } from 'src/DTO/RegisterDTO';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) { }

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email } })
        if (!user) {
            throw new BadRequestException("User not found");
        }
        return user;
    }

    async login(user: User, res) {
        const payload = { email: user.email, id: user.id, role: user.role };
        const token = this.jwtService.sign(payload, { expiresIn: "1h" })

        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3600 * 1000,
            secure: false,
            sameSite: "lax"
        })
        return res.json({ access_token: token });
    }

    async register(user: RegisterDTO) {
        const existingUser = await this.userRepository.findOne({ where: { email: user.email } })
        if (existingUser) {
            throw new BadRequestException("User already registered");
        }
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = { ...user, password: hashedPassword };
        await this.userRepository.save(newUser);
        return { message: "User created successfully" };
    }


}
