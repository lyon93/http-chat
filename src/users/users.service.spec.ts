import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;
  const mockUser: User = {
    id: 1,
    email: 'test@gmail.com',
    isActive: true,
    password: 'asdkjasd#',
    username: 'test',
  };
  const mockUserRepository = {
    findOne: jest
      .fn()
      .mockImplementation((arg: any) => Promise.resolve(mockUser)),
    findByEmail: jest
      .fn()
      .mockImplementation((arg: any) => Promise.resolve(mockUser)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find user by id', async () => {
    const result: User = await service.findOne(1);
    expect(result.email).toEqual(mockUser.email);
  });
  it('should find user by email', async () => {
    const result: User = await service.findByEmail('test@gmail.com');
    expect(result.email).toEqual(mockUser.email);
  });
});
