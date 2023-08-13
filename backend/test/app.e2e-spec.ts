import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as pactum from 'pactum';
import { TodoDto } from 'src/todo/dto/todo.dto';
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
  describe('Todo', () => {
    const dto: TodoDto = {
      title: 'Absorb chakra',
      description: 'Lore Ipsum Lore lore Ipsum magratio incendius patronus',
      priority: 3,
    };
    describe('Auth check', () => {
      it('should throw auth error', () => {
        return pactum.spec().get(`/todo`).expectStatus(401);
      });
    });
    describe('Create Todo', () => {
      it('Should create one', () => {
        return pactum
          .spec()
          .post(`/todo`)
          .withBody({ ...dto })
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .stores('TodoId', 'id')
          .expectStatus(201);
      });
      it('Should create a second one', () => {
        return pactum
          .spec()
          .post(`/todo`)
          .withBody({ ...dto })
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .stores('TodoId2', 'id')
          .expectStatus(201);
      });
    });
    describe('Get Todo', () => {
      it('Should get all', () => {
        return pactum
          .spec()
          .get(`/todo`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(200);
      });
    });
    describe('Get Todo by id', () => {
      it('Should get one', () => {
        return pactum
          .spec()
          .get(`/todo/$S{TodoId}`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(200);
      });
    });
    describe('Edit Todo', () => {
      it('Should edit', () => {
        const editDto = { description: 'New Description' };
        return pactum
          .spec()
          .patch(`/todo/$S{TodoId2}`)
          .withBody(editDto)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectBodyContains(editDto.description)
          .expectStatus(200);
      });
    });
    describe('Delete Todo', () => {
      it('Should delete one', () => {
        return pactum
          .spec()
          .delete(`/todo/$S{TodoId2}`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(204);
      });
      it('Should not exist by getting  it', () => {
        return pactum
          .spec()
          .get(`/todo/$S{TodoId2}`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(404);
      });
      it('Should not exist by editing it', () => {
        return pactum
          .spec()
          .patch(`/todo/$S{TodoId2}`)
          .withHeaders({ Authorization: ' Bearer $S{UserAt}' })
          .expectStatus(404);
      });
    });
  });
});
