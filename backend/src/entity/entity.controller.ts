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
} from '@nestjs/common';
import { EditEntityDto, EntityDto } from './dto/entity.dto';
import { EntityService } from './entity.service';

// @UseGuards(JwtGuard)
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
