import {Component, OnInit} from '@angular/core';
import {SearchStatusService} from './search-box/search-box.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [SearchStatusService],
})
export class AppComponent implements OnInit {
  ngOnInit() {
  }
}
