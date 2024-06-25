// src/graphql/user.resolver.ts
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

/**
 * Resolver is used to define the GraphQL operations for user entity
 * @class UserResolver
 */

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Get user details by user id
   * @param {Number} userId - User id to get user details by id
   * @returns {User} - User details
   */
  @Query(() => User, { name: 'user' })
  getUser(@Args('userId', { type: () => Int }) userId: number): User {
    return this.userService.getUserById(userId);
  }
}
