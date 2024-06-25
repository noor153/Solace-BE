import { Mapper } from '@automapper/core';
import { getMapperToken } from '@automapper/nestjs';
import { Controller, Get, Inject, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dtos/user.dto';
import { User } from './graphql/user/user.model';
import { UserService } from './graphql/user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    @Inject(getMapperToken()) private readonly classMapper: Mapper,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('user/:userId')
  getUserData(@Param('userId', ParseIntPipe) userId: number): UserDTO {
    const user: User = this.userService.getUserById(userId);
    console.log('[LOGGING][AppController][getUserData] user: ', user);
    if (!user) {
      throw new Error('User not found');
    }
    const mappedUser = this.classMapper.map(user, User, UserDTO);
    console.log(
      '[LOGGING][AppController][getUserData] mappedUser: ',
      mappedUser,
    );
    return mappedUser;
  }
}
