import { AuthService } from './auth/auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';

describe('AppController', () => {
  let appController: AppController;
  const mockUsersService = {
    findAll: jest.fn().mockImplementation((arg: any) => Promise.resolve([])),
  };
  const mockAppService = {
    getHello: jest.fn().mockImplementation((arg: any) => Promise.resolve([])),
  };
  const mockAuthService = {
    login: jest.fn().mockImplementation((arg: any) => Promise.resolve({})),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: UsersService, useValue: mockUsersService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
  });
});
