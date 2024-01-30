import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRepositoryService } from '@app/database/users.repository/users.repository';
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
    return this.userRepository.find();
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Creates a new user.',
  })
  @ApiResponse({ status: 201, description: 'User successfully created.' })
  create(@Body() data: CreateUserDto) {
    return this.userRepository.create<CreateUserDto>(data);
  }
}
