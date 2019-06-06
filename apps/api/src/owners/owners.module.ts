import {Module} from '@nestjs/common';
import {OwnersController} from './owners.controller';
import {CatsService} from '../cats/cats.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatEntity} from '../cats/cat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [OwnersController],
  providers: [CatsService]
})
export class OwnersModule {
}
