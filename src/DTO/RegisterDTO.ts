import { IsEmail, IsNotEmpty } from 'class-validator';
import { UserRole } from 'src/entities/user.entity';

export class RegisterDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;

    role: UserRole;
}