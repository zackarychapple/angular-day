import {Body, Catch, Controller, Delete, Get, HttpStatus, Param, Req, UseGuards} from '@nestjs/common';
import {CatsService} from '../cats/cats.service';
import {CatDto} from '../cats/cat.dto';
import {plainToClass} from 'class-transformer';
import {Roles} from '../common/decorators/roles.decorator';
import {RolesGuard} from '../common/guards/roles.guard';
import {AuthGuard} from '@nestjs/passport';

// TODO: This should not have to have jwt since we set it as our default strategy
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Catch()
@Controller('owner')
export class OwnersController {

  constructor(private catsService: CatsService) {
  }

  @Get('/:ownerName')
  async getCats(@Param('ownerName') ownerName: string, @Req() req) {
    // TODO: make sure this is cleaned up
    const returnedCats = [];
    const roles = [];
    req.user.roles.forEach((role: any) => roles.push(role.name));
    const fetchedCats: Array<CatDto> = await this.catsService.getCatsByOwner(ownerName);
    fetchedCats.forEach((cat: CatDto) => {
      const newCat = plainToClass(CatDto, cat, {groups: roles});
      returnedCats.push(newCat);
    });
    return returnedCats;
  }

  @Roles('admin')
  @Delete('/')
  async deleteOwner(@Body() body){
    await this.catsService.deleteCatsById(body.cats);
    return HttpStatus.OK;
  }
}
