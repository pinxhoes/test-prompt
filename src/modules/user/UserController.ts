import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './UserService';
import { User } from './UserEntity';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body('name') name: string): Promise<User> {
        return this.userService.create(name);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
}