import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './tasks-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});
const mockUser = {
  id: 'testId',
  username: 'testUser',
  password: 'testPassword',
  tasks: [],
};
describe('Task Service Testing', () => {
  let tasksService: TasksService;
  let tasksRepository;

  beforeEach(async () => {
    // Initialize NestJS module and taskService and taskRepository
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TasksRepository,
          useFactory: mockTaskRepository,
        },
      ],
    }).compile();
    tasksRepository = module.get(TasksRepository);
    tasksService = module.get(TasksService);
  });

  describe('getTask', () => {
    it('calls getTasks and return the results', async () => {
      expect(tasksRepository.getTasks).not.toHaveBeenCalled();
      // call getTasks, which should than call the repository's getTasks
      tasksRepository.getTasks.mockResolvedValue('SomeValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(tasksRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('SomeValue');
    });
  });

  describe('getTaskById', () => {
    it('calls getTaskById and return the result', async () => {
      const mockTask = {
        title: 'Mock Task',
        id: 'someId',
        description: 'some description',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls getTaskById and handles error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(NotFoundException);
    });
  });
});
