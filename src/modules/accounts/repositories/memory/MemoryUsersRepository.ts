import { ICreateUserDTO } from '~modules/accounts/dtos';
import { User } from '~modules/accounts/infra/typeorm/entities/User';

import { IUsersRepository } from '../IUsersRepository';

class MemoryUsersRepository implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, { ...data });

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  async save(user: User): Promise<void> {
    const userIndex = this.users.findIndex(({ id }) => user.id === id);

    this.users[userIndex] = user;
  }
}

export { MemoryUsersRepository };