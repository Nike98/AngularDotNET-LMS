import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { ApiService } from './shared/services/api.service';
import { UsersModule } from './users/users.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SharedModule, AuthModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    let status = this.apiService.isLoggedIn() ? 'loggedIn' : 'loggedOff';
    this.apiService.userStatus.next(status);
  }
  title = 'UI';

  constructor(private apiService: ApiService) {}
}
