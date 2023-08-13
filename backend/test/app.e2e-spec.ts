import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { EditUserDto } from '../src/user/dto';

describe('App e2e', () => {
  const path = 'http://localhost:3334';
  let app: INestApplication;
  let prisma: PrismaService;
  pactum.request.setBaseUrl(path);
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleRef.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
      }),
    );
    await app.init();
    await app.listen(3334);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
  });

  afterAll(() => {
    app.close();
  });

  const dto: AuthDto = {
    email: 'authtest@test.ts',
    password: 'test',
  };
  it.todo('Hello World');
  describe('Auth', () => {
    describe('Signup', () => {
      it('Email empty Should throw error', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Password empty Should throw error', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody({ email: dto.email })
          .expectStatus(400);
      });
      it('No Body should throw error', () => {
        return pactum.spec().post(`/auth/signup`).expectStatus(400);
      });
      it('Should signup', () => {
        return pactum
          .spec()
          .post(`/auth/signup`)
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Login', () => {
      it('Email empty Should throw error', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody({ password: dto.password })
          .expectStatus(400);
      });
      it('Password empty Should throw error', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody({ email: dto.email })
          .expectStatus(400);
      });

      it('No Body should throw error', () => {
        return pactum.spec().post(`/auth/login`).expectStatus(400);
      });

      it('Incorrect Pass Should not login', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody({ ...dto, password: '1' })
          .expectStatus(403);
      });
      it('Should login', () => {
        return pactum
          .spec()
          .post(`/auth/login`)
          .withBody(dto)
          .expectStatus(200)
          .stores('UserAt', 'access_token');
      });
    });
  });
  describe('User', () => {
    describe('Auth check', () => {
      it('should throw auth error', () => {
        return pactum.spec().get(`/users/me`).expectStatus(401);
      });
    });
    describe('Get me', () => {
      it('should get current user', () => {
        return pactum
          .spec()
          .get(`/users/me`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit User', () => {
      it('should edit current user', () => {
        const editDto: EditUserDto = {
          firstName: 'Victor J',
          lastName: 'Lopez Roque',
        };
        return pactum
          .spec()
          .patch(`/users`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .withBody(editDto)
          .expectBodyContains(editDto.firstName)
          .expectBodyContains(editDto.lastName)
          .expectStatus(200);
      });
    });
  });
});
