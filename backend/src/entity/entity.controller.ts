import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EntityService } from './entity.service';
import { EntityDto, EditEntityDto } from './dto/entity.dto';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('entities')
export class EntityController {
  constructor(private entityService: EntityService) {}

  @Get()
  getAllEntities() {
    return this.entityService.getAllEntities();
  }

  @Post()
  createEntity(@Body() dto: EntityDto) {
    return this.entityService.createEntity(dto);
  }

  @Get(':id')
  getEntityById(@Param('id', ParseIntPipe) entityId: number) {
    return this.entityService.getEntityById(entityId);
  }

  @Patch(':id')
  editEntityById(
    @Param('id', ParseIntPipe) entityId: number,
    @Body() dto: EditEntityDto,
  ) {
    return this.entityService.editEntityById(entityId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteEntityById(@Param('id', ParseIntPipe) entityId: number) {
    return this.entityService.deleteEntityById(entityId);
  }
}
