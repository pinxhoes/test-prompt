import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../modules/user/UserEntity';
import { Logger } from '@nestjs/common';

/**
 * Seeds the database with initial mock user data for development and testing.
 * Ensures a predefined set of users (Alice, Bob, Carl) is available when the application starts.
 * Skips seeding if users already exist.
 */
@Injectable()
export class MockupData implements OnApplicationBootstrap {
    private readonly logger = new Logger(MockupData.name);

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async onApplicationBootstrap() {
        const predefinedUsers = ['Alice', 'Bob', 'Carl'];

        for (const userName of predefinedUsers) {
            const exists = await this.userRepository.findOne({
                where: { name: userName }
            });

            if (!exists) {
                const user = this.userRepository.create({ name: userName });
                await this.userRepository.save(user);
                this.logger.log(`Mock user created: ${userName}`);
            }
        }
    }
}