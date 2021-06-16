import {Component, OnInit} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs';
import {Role} from '../services/role.model';
import {User} from '../services/user.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  roles$: Role[];
  users$: User[];
  userId: string;
  roleIndex = -1;
  userIndex = -1;
  missingUsersInRole: any;
  responseMessage: any;

  constructor(private userService: UserService, public toastController: ToastController, public translate: TranslateService) {
    translate.setDefaultLang('en');

   }

  ngOnInit() {
    this.getData();
  }

  usersNotInRole(roleId){
    let role;
    let usersInRole;

    this.roles$.forEach(item => {
      if (item.id === roleId) {
        role = item;
        usersInRole = role.users;
      }
    });
    const onlyInA = this.users$.filter(this.comparer(usersInRole));
    const onlyInB = usersInRole.filter(this.comparer(this.users$));
    this.missingUsersInRole = onlyInA.concat(onlyInB);
    this.userId = null;
  }

  comparer(otherArray: any): any {
    return (current) => otherArray.filter(other => other.id === current.id && other.userName === current.username).length === 0;
  }

  getData() {
    forkJoin(
      {
        roles: this.userService.getRoles(),
        users: this.userService.getUser(),
      }
    )
      .subscribe(async value => {

        this.roles$ = await value.roles;
        this.users$ = await value.users;
      });
  }

  addRole(role, roleDescription) {
    this.userService.addRole(role, roleDescription).subscribe(async res => {
      const toast = this.toastController.create({
        message: res.toString(),
        duration: 2000
      });
      (await toast).present();
      this.getData();
    },       error => console.log('error from component', error));

  }

   deleteRole(roleId) {
    this.userService.deleteRole(roleId).subscribe(async res => {
      const toast = this.toastController.create({
        message: res.toString(),
        duration: 2000
      });
      (await toast).present();
      this.getData();
    },       error => console.log('error from component', error));

   }

   assignUserToRole(userId, roleId){
     this.userService.assignUserToRole(userId, roleId).subscribe(async res => {
       const toast = this.toastController.create({
         message: res.toString(),
         duration: 2000
       });
       (await toast).present();
       this.getData();
     },
       error => console.log('error from component', error));
  }

  unassignUserToRole(userId, roleId) {
    this.userService.unassignUserToRole(userId, roleId).subscribe(async res => {
      this.responseMessage = res;
      const toast = this.toastController.create({
        message: this.responseMessage.response,
        duration: 2000
      });
      (await toast).present();
      this.getData();
    });
  }

  toggleRoles(index) {
    if (this.roleIndex === index) {
      this.roleIndex = -1;
    } else {
      this.roleIndex = index;

    }
  }

}
