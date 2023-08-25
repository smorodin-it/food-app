import { Test } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { BackendAuthService } from './backend-auth.service';
import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { BackendUserService } from '@food-app/backend/features/user';
import { SignInDto, SignUpDto } from './backend-auth.dto';

import { Prisma, User as UserModel } from '@food-app/backend/orm';

import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';

describe('BackendAuthService', () => {
  let service: BackendAuthService;
  let userService: DeepMocked<BackendUserService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [BackendAuthService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get(BackendAuthService);
    userService = module.get(BackendUserService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });

  describe('create user method', () => {
    const signUpDto: SignUpDto = {
      email: 'test@test.local',
      password: 'tEsttest1!',
      confirmPassword: 'tEsttest1!',
    };

    it('should create user and return tokens', async () => {
      const user: UserModel = {
        active: false,
        email: signUpDto.email,
        id: crypto.randomUUID(),
        passwordHash: '',
        refreshToken: crypto.randomUUID(),
      };

      userService.create.mockResolvedValueOnce(user);

      const tokens = await service.createUser(signUpDto);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should throw ConflictException if user with email already exist', async () => {
      userService.create.mockImplementation(() => {
        throw new Prisma.PrismaClientKnownRequestError('', {
          code: 'P2002',
          clientVersion: '',
        });
      });

      let err: ConflictException | null = null;

      try {
        await service.createUser(signUpDto);
      } catch (e) {
        if (e instanceof ConflictException) {
          err = e;
        }
      }

      expect(err?.getResponse()).toStrictEqual({
        statusCode: 409,
        message: `User with email ${signUpDto.email} already exist`,
        error: 'Conflict',
      });
    });
  });

  describe('validateUser method', () => {
    const signInDto: SignInDto = {
      email: 'test@test.local',
      password: 'tEsttest1!',
    };

    const user: UserModel = {
      active: false,
      email: signInDto.email,
      id: crypto.randomUUID(),
      passwordHash: '',
      refreshToken: crypto.randomUUID(),
    };

    beforeEach(async () => {
      user.passwordHash = await bcrypt.hash(signInDto.password, 10);
    });

    it('should return tokens if user exist', async () => {
      userService.retrieveByEmail.mockResolvedValueOnce(user);

      const tokens = await service.validateUser(signInDto);

      expect(tokens).toHaveProperty('accessToken');
      expect(tokens).toHaveProperty('refreshToken');
    });

    it('should return NotFoundException if try login with not exist email', async () => {
      const badSignInDto: SignInDto = {
        email: 'badEmail@test.local',
        password: 'BAD_PASSWORD',
      };

      userService.retrieveByEmail.mockResolvedValueOnce(null);

      let err: NotFoundException | null = null;

      try {
        await service.validateUser(badSignInDto);
      } catch (e) {
        if (e instanceof NotFoundException) {
          err = e;
        }
      }

      expect(err?.getResponse()).toStrictEqual({
        error: 'Not Found',
        message: 'Account with provided credentials not found',
        statusCode: 404,
      });
    });

    it('should return NotFoundException if try login with wrong password', async () => {
      const badSignInDto: SignInDto = {
        email: signInDto.email,
        password: 'BAD_PASSWORD',
      };

      userService.retrieveByEmail.mockResolvedValueOnce(user);

      let err: NotFoundException | null = null;

      try {
        await service.validateUser(badSignInDto);
      } catch (e) {
        if (e instanceof NotFoundException) {
          err = e;
        }
      }

      expect(err?.getResponse()).toStrictEqual({
        error: 'Not Found',
        message: 'Account with provided credentials not found',
        statusCode: 404,
      });
    });
  });
});
