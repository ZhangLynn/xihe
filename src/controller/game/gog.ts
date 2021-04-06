import {
  Inject,
  Controller,
  Get,
  Provide,
  ContentType,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { GOGService } from '../../service';

@Provide()
@Controller('/api/game')
export class GOGController {
  @Inject()
  ctx: Context;

  @Inject()
  gogService: GOGService;

  @Get('/gog')
  @ContentType('text/calendar')
  async getComingGames() {
    return await this.gogService.getComingGames();
  }
}
