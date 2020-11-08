import { Image } from './image';
import { Episode } from './episode';

export class Season {
  public id: number;
  public number: number;
  public image: Image;
  public episodes: string[];
}
