import { App, Provide } from '@midwayjs/decorator';
import { Application } from 'egg';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { createEvents, DateArray, EventAttributes } from 'ics';

import { gog } from '../../typings/gog';

dayjs.extend(utc);
dayjs.extend(timezone);

@Provide()
export class GOGService {
  @App()
  app: Application;

  generateCalendar(games: gog.Game[]): string {
    const events: EventAttributes[] = games.map(
      (game: gog.Game): EventAttributes => {
        const {
          title,
          slug,
          genres,
          salesVisibility: { fromObject },
        } = game;
        const { date, timezone: tz } = fromObject;

        return {
          productId: this.app.config.productId,
          calName: 'GOG.com',
          title,
          url: `https://www.gog.com/game/${slug}`,
          categories: genres.filter(category => category.length),
          start: dayjs
            .tz(date, tz)
            .utc()
            .format('YYYY-M-D-H-m')
            .split('-')
            .map(s => parseInt(s, 10)) as DateArray,
          startInputType: 'utc',
          startOutputType: 'utc',
          duration: {
            days: 1,
          },
        };
      }
    );

    const { error, value } = createEvents(events);

    return error ? '' : value;
  }

  async getComingGames(): Promise<string> {
    const data = await this.app.curl(
      'https://www.gog.com/games/ajax/filtered?availability=coming',
      {
        dataType: 'json',
      }
    );

    const games: gog.Game[] = data?.data?.products;

    return this.generateCalendar(games);
  }
}
