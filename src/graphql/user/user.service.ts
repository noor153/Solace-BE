// src/graphql/user.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { User } from './user.model';

/**
 * User service class for user entity operations in the application
 * @class UserService
 */
@Injectable()
export class UserService {
  private users: User[];

  constructor() {
    const filePath = path.join(__dirname, '../../../data/user.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    this.users = JSON.parse(fileContent);
  }

  /**
   * Get user details by user id from the user list in the application data
   * @param {Number} userId - User id to get user details by id
   * @returns {User} - User details
   */
  getUserById(userId: number): User {
    try {
      // Log the user id and users
      console.log(
        '[LOGGING][UserService][getUserById] userId: ',
        userId,
        'users: ',
        this.users,
      );

      // Find the user by user id
      const response = this.users.find(
        (user) => user.maritalStatus.id == userId,
      );
      // Log the response
      console.log('[LOGGING][UserService][getUserById] response: ', response);
      // Check if the response is empty
      if (!response) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }
      // Return the response
      return response;
    } catch (error) {
      // Log the error
      console.error(
        '[ERROR][UserService][getUserById] Error occurred while getting user details by id: ',
        error,
      );
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  }
}
