import { Component, OnInit } from '@angular/core';
import { ShowService } from 'src/app/core/services/show.service';
import { ShowDetail } from 'src/app/core/models/search/show-detail';
import { Season } from 'src/app/core/models/season';
import { Cast } from 'src/app/core/models/cast';

@Component({
  selector: 'app-show-detail',
  templateUrl: './show-detail.component.html',
  styleUrls: ['./show-detail.component.css']
})
export class ShowDetailComponent implements OnInit {

  public selectedShow: ShowDetail;
  public castList: Cast[];
  public seasonsList: Season[];

  constructor(private showService: ShowService) {
  }

  ngOnInit() {
    this.selectedShow = this.showService.getSelectedShow();
    this.showService.getCast(this.selectedShow.id).subscribe(response => this.castList = response);
    this.showService.getSeasons(this.selectedShow.id).subscribe(response => this.getEpisodes(response));
  }

  private getEpisodes(response: Season[]) {
    this.seasonsList = response;
    this.seasonsList.forEach(season => {
      season.episodes = [];
      this.showService.getEpisodes(season.id)
                      .subscribe(episodes => episodes.forEach(episode => this.addEpisode(season, episode.number, episode.name)));
    });
  }

  private addEpisode(season: Season, episodeNumber: number, name: string): void {
    if (episodeNumber && name) {
      season.episodes.push(episodeNumber + '. ' + name);
    }
  }
}
