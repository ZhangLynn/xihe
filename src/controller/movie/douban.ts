import {
  Inject,
  Controller,
  Get,
  Provide,
  ContentType,
} from '@midwayjs/decorator';
import { Context } from 'egg';

import { DoubanService } from '../../service';

@Provide()
@Controller('/api/movie')
export class DoubanController {
  @Inject()
  ctx: Context;

  @Inject()
  doubanService: DoubanService;

  @Get('/douban')
  @ContentType('text/calendar')
  async getComingGames(): Promise<string> {
    return await this.doubanService.getComingMovies();
  }
}
