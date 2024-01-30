import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepositoryService } from '@app/database/user.repository/user.repository.service';
import { CreateUserDto } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly userRepository: UserRepositoryService,
  ) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
    description: 'Retrieves a list of all users.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of users successfully retrieved.',
  })
  findAll() {
    return this.userRepository.findAllUsers();
  }

  @Post()
  create(@Body() data: CreateUserDto) {
    return this.userRepository.createUser(data);
  }
}
