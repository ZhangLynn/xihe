import { App, Provide } from '@midwayjs/decorator';
import { Application } from 'egg';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import * as $ from 'cheerio';
import { createEvents, DateArray, EventAttributes } from 'ics';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Movie {
  title: string;
  time: string;
  url: string;
  description: string;
}

@Provide()
export class DoubanService {
  @App()
  app: Application;

  generateCalendar(movies: Movie[]): string {
    const events: EventAttributes[] = [];

    movies.forEach((movie: Movie) => {
      const { title, time, url, description } = movie;
      const now = dayjs();
      let date = time;

      if (date.indexOf('年') === -1) {
        date = `${now.format('YYYY')}年${date}`;
      }

      if (date.indexOf('日') !== -1) {
        date = date.replace('年', '-').replace('月', '-').replace('日', '-');

        const event: EventAttributes = {
          productId: this.app.config.productId,
          calName: 'Douban',
          title,
          url,
          description,
          start: dayjs
            .tz(date, 'Asia/Shanghai')
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

        events.push(event);
      }
    });

    const { error, value } = createEvents(events);

    return error ? '' : value;
  }

  async getComingMovies(): Promise<string> {
    const data = await this.app.curl('https://movie.douban.com/coming', {
      dataType: 'text/html',
    });

    const movies: Movie[] = [];
    const html = Buffer.from(data?.data).toString('utf-8');
    const $html = $.load(html);
    const $comingList = $html('.coming_list tbody tr');

    $comingList.each((_, tr) => {
      const $tds = $(tr).find('td');
      const time = $($tds.get(0)).text().trim();

      const $a = $($tds.get(1)).find('a');
      const description = $a.attr('title').trim();
      const title = $a.text().trim();
      const url = $a.attr('href').trim();

      movies.push({
        title,
        time,
        url,
        description,
      });
    });

    return this.generateCalendar(movies);
  }
}
