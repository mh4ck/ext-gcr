import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';
import { AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { TermsOfUseComponent } from '../components/terms-of-use/terms-of-use.component';

@Component({
  selector: 'app-request',
  templateUrl: './request.page.html',
  styleUrls: ['./request.page.scss'],
})
export class RequestPage implements OnInit {
  public step = 1;
  public steps = 5;
  public lastDirection = 'next';
  public loading: boolean = false;

  constructor(
    public requestService: RequestService,
    private alertController: AlertController,
    private router: Router,
    private modalController: ModalController
  ) {}

  ngOnInit() {}

  validate(validate?: any, or: boolean = false) {
    if (typeof validate == 'string') {
      let value = this.requestService.get(validate);
      if (!value || value == null) {
        this.alertController
          .create({
            header: 'Error',
            message: 'Please fill in the required fields',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
        return false;
      }
    }

    if (or && typeof validate == 'object') {
      let valid = false;
      (validate as any).forEach((element: any) => {
        let value = this.requestService.get(element);
        if (value && value != null && value != '') valid = true;
      });
      if (!valid) {
        this.alertController
          .create({
            header: 'Error',
            message: 'Please fill out at least one field.',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
        return false;
      }
    }

    if (!or && typeof validate == 'object') {
      let valid = true;
      (validate as any).forEach((element: any) => {
        let value = this.requestService.get(element);
        if (!value || value == null || value == '') valid = false;
      });
      if (!valid) {
        this.alertController
          .create({
            header: 'Error',
            message: 'Please fill in the required fields',
            buttons: ['OK'],
          })
          .then((alert) => {
            alert.present();
          });
        return false;
      }
    }
    return true;
  }

  nextStep(validate?: any, or: boolean = false) {
    if (!this.validate(validate, or)) return;
    if (this.step != this.steps) this.step++;
    this.lastDirection = 'next';
  }

  prevStep() {
    if (this.step != 1) this.step--;
    this.lastDirection = 'prev';
  }

  submit(validate?: any, or: boolean = false) {
    if (!this.validate(validate, or)) return;
    let text = `Hello do you have a car available for rent? I am looking for a car with ${this.requestService.get(
      'doors'
    )} doors at best a ${this.requestService.get(
      'transmission'
    )} one. Pickup from ${this.requestService.get(
      'pickup-location'
    )} at ${this.requestService.get(
      'pickup-datetime'
    )} and drop off at ${this.requestService.get(
      'dropoff-location'
    )} at ${this.requestService.get('dropoff-datetime')}.`;
    text = encodeURIComponent(text);
    try {
      (window as any).chrome.tabs.create({
        url: 'https://wa.me/+35699323765?text=' + text,
      });
    } catch (e) {}
    this.router.navigate(['/tabs/success']);
  }

  canBack() {
    return this.step != 1;
  }

  canNext() {
    return this.step != this.steps;
  }

  canSubmit() {
    return this.step == this.steps;
  }

  handleSelect(key: any, event: any) {
    this.requestService.set(key, event.detail.value);
  }

  handleChecked(key: any, event: any) {
    this.requestService.set(key, event.detail.checked || null);
  }

  directionClass() {
    if (this.lastDirection == 'next') return 'form-step r-in';
    if (this.lastDirection == 'prev') return 'form-step l-in';
    return 'form-step r-in';
  }

  async openTerms() {
    let modal = await this.modalController.create({
      component: TermsOfUseComponent,
    });
    modal.present();
  }
}
