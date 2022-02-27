import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;
    // salt
    const salt = await bcrypt.genSalt();
    // hash
    const hashPassword = await bcrypt.hash(password, salt);

    const user = this.create({ username, password: hashPassword });
    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // duplicate user name
        throw new ConflictException('user already exists!');
      }
      throw new InternalServerErrorException();
    }
  }
}
