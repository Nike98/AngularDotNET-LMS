import { UserType } from './../../../models/models';
import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

export interface NavigationItem {
  value: string;
  link: string;
}

@Component({
  selector: 'page-side-nav',
  templateUrl: './page-side-nav.component.html',
  styleUrl: './page-side-nav.component.scss',
})
export class PageSideNavComponent {
  panelName: string = '';
  navItems: NavigationItem[] = [];

  constructor(private apiService: ApiService, private router: Router) {
    this.navItems = [
      { value: 'View Books', link: 'view-books' },
      { value: 'My Orders', link: 'my-orders' },
    ];

    apiService.userStatus.subscribe({
      next: (status) => {
        if (status == 'loggedIn') {
          router.navigateByUrl('/home');
          let user = apiService.getUserInfo();

          if (user != null) {
            if (user.userType == UserType.ADMIN) {
              this.panelName = 'Admin Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'Maintenance', link: '/maintenance' },
                { value: 'Return Book', link: '/return-book' },
                { value: 'View Users', link: '/view-users' },
                { value: 'Approval Requests', link: '/approval-requests' },
                { value: 'All Orders', link: '/all-orders' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            } else if (user.userType == UserType.STUDENT) {
              this.panelName = 'Student Panel';
              this.navItems = [
                { value: 'View Books', link: '/home' },
                { value: 'My Orders', link: '/my-orders' },
              ];
            }
          }
        } else if (status == 'logedOff') {
          this.panelName = 'Auth Panel';
          router.navigateByUrl('/login');
          this.navItems = [];
        }
      },
    });
  }
}
