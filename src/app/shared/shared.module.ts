import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Drivers } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component';

import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [TermsOfUseComponent],
  exports: [TermsOfUseComponent],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__appdb',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    }),
  ],
  providers: [],
})
export class SharedModule {}
