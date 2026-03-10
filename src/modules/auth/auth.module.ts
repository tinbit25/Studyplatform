import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    JwtModule.register({
      secret: "super-secret-key",
      signOptions: { expiresIn: "1d" },
    }),

    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema }
    ])
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}