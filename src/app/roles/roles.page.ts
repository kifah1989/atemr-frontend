/* eslint-disable guard-for-in */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable eqeqeq */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/prefer-for-of */
import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Role } from '../services/role.model';
import { User } from '../services/user.model';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {
  roles$: any;
  users$: any;
  userId: string;
  roleIndex = -1;
  userIndex = -1;
  addUsers: any;
  constructor(private userService: UserService, public toastController: ToastController) { }

  ngOnInit() {
    this.getRoles();
    this.getUsers();
  }

  async getRoles(): Promise<void> {
    this.userService.getRoles().subscribe(
      async (value: Role[]) => {
        this.roles$ = value;
      });
  }

  async getUsers(): Promise<void> {
    this.userService.getUser().subscribe(
      async (value: User[]) => {
        this.users$ = value;
      });
  }


  async addRole(role, roleDescription): Promise<void> {
    this.userService.addRole(role, roleDescription)
    .subscribe(async data => {
      this.roles$ = data;

    },
      async respose => {
  const toast =  this.toastController.create({
    message: respose.error.text,
    duration: 2000
  });
  (await toast).present();
},
    async () => {
      this.getRoles();
      this.getUsers();

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
      this.getRoles();
      this.getUsers();
    },
      async () => {
        this.getRoles();
        this.getUsers();
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
      this.getRoles();
      this.getUsers();
    },
      async () => {
        this.getRoles();
        this.getUsers();
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
      this.getRoles();
      this.getUsers();
    },
      async () => {
        this.getRoles();
        this.getUsers();
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