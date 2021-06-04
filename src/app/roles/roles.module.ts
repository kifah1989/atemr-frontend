/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
TranslateModule
  ],

  declarations: [RolesPage]
})
export class RolesPageModule {}
