import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowDetail } from '../models/search/show-detail';
import { Season } from '../models/season';
import { Cast } from '../models/cast';
import { Episode } from '../models/episode';
import { Show } from '../models/search/show';

@Injectable()
export class ShowService {
  private selectedShow: ShowDetail;

  constructor(private httpClient: HttpClient) {
  }

  public listAll(): Observable<ShowDetail[]> {
    return this.httpClient.get<ShowDetail[]>('http://api.tvmaze.com/shows');
  }

  public searchByKeywords(keywords: string): Observable<Show[]> {
    return this.httpClient.get<Show[]>('http://api.tvmaze.com/search/shows?q=' + keywords);
  }

  public getCast(idShow: number): Observable<Cast[]> {
    return this.httpClient.get<Cast[]>('http://api.tvmaze.com/shows/' + idShow + '/cast');
  }

  public getSeasons(idShow: number): Observable<Season[]> {
    return this.httpClient.get<Season[]>('http://api.tvmaze.com/shows/' + idShow + '/seasons');
  }

  public getEpisodes(idSeason: number): Observable<Episode[]> {
    return this.httpClient.get<Episode[]>('http://api.tvmaze.com/seasons/' + idSeason + '/episodes');
  }

  public setNewSelectedShow(show: ShowDetail): void {
    this.selectedShow = show;
  }

  public getSelectedShow() {
    return this.selectedShow;
  }
}
