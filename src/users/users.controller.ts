import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepositoryService } from '@app/database/user.repository/user.repository.service';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  @Get()
  findAll() {
    return this.userRepository.findAllUsers();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }
}
