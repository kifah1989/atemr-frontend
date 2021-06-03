/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { forkJoin, Observable } from 'rxjs';
import { Role } from '../services/role.model';
import { User } from '../services/user.model';
import { UserService } from '../services/user.service';
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
  constructor(private userService: UserService, public toastController: ToastController) { }

  ngOnInit() {
    this.getData();
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

        console.log('roles ', this.roles$)

        console.log('users ', this.users$)
      });
  }

  async addRole(role, roleDescription): Promise<void> {
    this.userService.addRole(role, roleDescription)
      .subscribe(async data => {
        this.roles$ = data;

      },
        async respose => {
          const toast = this.toastController.create({
            message: respose.error.text,
            duration: 2000
          });
          (await toast).present();
        },
        async () => {
          this.getData();
        });
  }

  async deleteRole(roleId): Promise<void> {
    this.userService.deleteRole(roleId).subscribe(data => {
      this.roles$ = data;
    },
      async respose => {
        const toast = this.toastController.create({
          message: respose.error.text,
          duration: 2000
        });
        (await toast).present();
        this.getData();
      });
  }

  async assignUserToRole(userId, roleId): Promise<void> {
    this.userService.assignUserToRole(userId, roleId).subscribe(data => {
      this.roles$ = data;
    }, async respose => {
      const toast = this.toastController.create({
        message: respose.error.text,
        duration: 2000
      });
      (await toast).present();
      this.getData();
    });
  }

  async unassignUserToRole(userId, roleId): Promise<void> {
    this.userService.unassignUserToRole(userId, roleId).subscribe(data => {
      this.roles$ = data;
    }, async respose => {
      const toast = this.toastController.create({
        message: respose.error.text,
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

  toggleUsers(index) {
    if (this.userIndex === index) {
      this.userIndex = -1;
    } else {
      this.userIndex = index;
    }
  }
}
