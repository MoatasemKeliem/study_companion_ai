// import { Module } from '@nestjs/common';
// import { AuthService } from '../Service/auth.service';
// import { AuthController } from '../controller/AuthController';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from 'src/entities/user.entity';
// import { JwtModule } from '@nestjs/jwt';
// import { LocalStrategy } from 'src/Strategy/local.strategy';
// import { JwtStrategy } from 'src/Strategy/jwt.strategy';
// import { ConfigModule } from '@nestjs/config';

// @Module({
//     imports: [
//         ConfigModule,
//         TypeOrmModule.forFeature([User]),
//         JwtModule.register({
//             global: true,
//             secret: process.env.JWT_SECRET,
//         }),],
//     providers: [AuthService, LocalStrategy, JwtStrategy],
//     controllers: [AuthController]
// })
// export class AuthModule { }


import { Module } from '@nestjs/common';
import { AuthService } from '../Service/auth.service';
import { AuthController } from '../controller/AuthController';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from 'src/Strategy/local.strategy';
import { JwtStrategy } from 'src/Strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forFeature([User]),

        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (config: ConfigService) => ({
                secret: config.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: config.get<string>('JWT_EXPIRES') || '1d',
                },
            }),
        }),

    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
})
export class AuthModule { }