import { UsersService } from './../users/users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';

describe('NotificationsController', () => {
  let controller: NotificationsController;
  const mockNotificationService = {
    findAll: jest.fn().mockImplementation((arg: any) => Promise.resolve({})),
  };
  const mockUsersService = {
    findByEmail: jest.fn().mockImplementation((arg: any) => Promise.resolve({})),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [
        { provide: NotificationsService, useValue: mockNotificationService },
        { provide: UsersService, useValue: mockUsersService },
      ],
    }).compile();

    controller = module.get<NotificationsController>(NotificationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
