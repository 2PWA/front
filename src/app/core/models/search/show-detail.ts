import { Schedule } from './schedule';
import { Rating } from './rating';
import { Image } from '../image';

export class ShowDetail {
  public id: number;
  public name: string;
  public summary: string;
  public language: string;
  public genre: string;
  public webChannel: string;
  public schedule: Schedule;
  public rating: Rating;
  public image: Image;
}
