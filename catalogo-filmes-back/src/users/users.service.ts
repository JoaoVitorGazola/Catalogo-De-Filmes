import { Injectable } from '@nestjs/common';

export type User = {
    userId: number,
    email: string,
    password: string
};

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'admin@admin.com',
      password: '$2b$10$uAnjxd6yJWYkr28DliJkDuJZSkRDgSwvKox5f85cSV2CjHswqcpoe',
    },
    {
      userId: 2,
      email: 'teste@teste.com',
      password: '$2b$10$FFCUfIQHOpuTah65OW3N9.q.0uoHNx9UjPtAvSVKUyqao2FPAu/lW',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }
  
}