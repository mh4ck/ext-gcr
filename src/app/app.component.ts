import { Component } from '@angular/core';
import { UsageService } from './usage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private usageService: UsageService) {
    this.usageService.initialize();
  }
}
