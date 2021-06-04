import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/services/user.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  users$: any;


  constructor(private userService: UserService, public translate: TranslateService) {
    translate.setDefaultLang('en');
}

  ngOnInit() {
    this.userService.getUser().subscribe(
      async (value: User[]) => {

        this.users$ = value;
      },
      (error) => error);
  }

}
