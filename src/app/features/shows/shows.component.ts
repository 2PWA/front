import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { ShowService } from 'src/app/core/services/show.service';
import { Show } from 'src/app/core/models/search/show';
import { ShowDetail } from 'src/app/core/models/search/show-detail';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {
  public user: User;
  public allShows: ShowDetail[];
  public keywords: string;

  constructor(private userService: UserService,
              private showService: ShowService,
              private router: Router,
              private cookieService: CookieService) {
    this.userService.findByUsername(this.cookieService.get('currentUsername'))
                    .subscribe(user => this.user = user);
    this.showService.listAll().subscribe(shows => this.allShows = shows);
  }

  ngOnInit() {
  }

  public viewDetail(selectedShow: ShowDetail): void {
    this.showService.setNewSelectedShow(selectedShow);
    this.router.navigate(['/show-detail']);
  }

  public search(): void {
    if (!this.keywords) {
      return;
    }
    this.showService.searchByKeywords(this.keywords).subscribe(shows => this.filterShows(shows));
  }

  public filterShows(shows: Show[]): void {
    this.allShows = shows.map(show => show.show);
  }
}
