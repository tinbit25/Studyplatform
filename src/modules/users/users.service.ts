import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as argon2 from 'argon2';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(userData: any): Promise<User> {
    const existing = await this.userModel.findOne({ email: userData.email });
    if (existing) throw new ConflictException('Email already exists');


    const hashedPassword = await argon2.hash(userData.password);
    
    const newUser = new this.userModel({
      ...userData,
      password: hashedPassword,
    });
    return newUser.save();
  }

  // Inside class UsersService
// 1. Find a user by ID
async findOne(userId: string) {
  return this.userModel.findById(userId).exec(); 
}

// 2. Update user profile data
async update(userId: string, updateDto: any) {
  return this.userModel.findByIdAndUpdate(userId, updateDto, { new: true }).exec();
}
  async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }
}