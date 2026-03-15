import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common'; 
@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(data: any) {
    const hashedPassword = await argon2.hash(data.password);

    const user = new this.userModel({
      name: data.name,
      email: data.email,
      password: hashedPassword,
    });

    return user.save();
  }

  async login(data: any) {
    const user = await this.userModel.findOne({ email: data.email });

    if (!user) { throw new UnauthorizedException('User not found'); } const valid = await argon2.verify(user.password, data.password); if (!valid) { throw new UnauthorizedException('Invalid password'); } 
    const token = this.jwtService.sign({
      sub: user._id,
      email: user.email,
    });

    return {
      access_token: token,
    };
  }
}