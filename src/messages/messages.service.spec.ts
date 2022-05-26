import { NotificationsService } from './../notifications/notifications.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';
import { Message } from './entities/message.entity';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('MessagesService', () => {
  let service: MessagesService;
  const mockNotificationService = {
    findAll: jest.fn().mockImplementation((arg: any) => Promise.resolve({})),
  };
  const mockMessageRepository = {
    findAll: jest.fn().mockImplementation((arg: any) => Promise.resolve({})),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: NotificationsService, useValue: mockNotificationService },
        {
          provide: getRepositoryToken(Message),
          useValue: mockMessageRepository,
        },
      ],
    }).compile();

    service = module.get<MessagesService>(MessagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
