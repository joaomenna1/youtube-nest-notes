import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../modules/repositories/UserRepositoryInMemory';
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let useRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    useRepositoryInMemory = new UserRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(useRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(useRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      name: 'teste',
      email: 'teste@email.com',
      password: '123123',
    });

    expect(useRepositoryInMemory.users).toEqual([user]);
  });

  it('Should be able to creeate user with password encrypted', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      name: 'teste',
      email: 'teste@email.com',
      password: '123123',
    });

    const userHasPasswordEncrypted = await compare(
      userPasswordWithoutEncryption,
      user.password,
    );

    expect(userHasPasswordEncrypted).toBeTruthy();
  });
});
