import { JwtService } from '@nestjs/jwt';
import { UsersService } from './../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  const mockUserService = {
    findAll: jest.fn().mockImplementation((arg: any) => Promise.resolve([])),
  };
  const mockJwtService = {
    sign: jest.fn().mockImplementation((arg: any) => Promise.resolve('')),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUserService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
