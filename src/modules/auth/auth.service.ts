import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}
async register(data: any) {
  console.log("Before save");

  const user = new this.userModel({
    name: data.name,
    email: data.email,
    password: data.password,
  });

  const savedUser = await user.save();

  console.log("After save");

  return savedUser;
}
}