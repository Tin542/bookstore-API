import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userService: UserRepository) {}

  
}
