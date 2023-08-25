import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  form: any = {
    subject: '',
    name: '',
    email: '',
    message: '',
  };

  constructor(
    private alertController: AlertController,
    private backendService: BackendService
  ) {}

  ngOnInit() {}

  handleChange(key: any, event: any) {
    this.form[key] = event.target.value;
  }

  validateEmail(email: any) {
    // eslint-disable-next-line no-useless-escape
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  submit() {
    // Check if subject, name, email, message exists
    if (
      typeof this.form.subject == 'undefined' ||
      this.form.subject == '' ||
      typeof this.form.name == 'undefined' ||
      this.form.name == '' ||
      typeof this.form.email == 'undefined' ||
      this.form.email == '' ||
      typeof this.form.message == 'undefined' ||
      this.form.message == ''
    ) {
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

    // Check if email is valid
    if (!this.validateEmail(this.form.email)) {
      this.alertController
        .create({
          header: 'Error',
          message: 'Please enter a valid email address',
          buttons: ['OK'],
        })

        .then((alert) => {
          alert.present();
        });
      return false;
    }

    this.form.namespace = 'gozo-car-rental';

    this.backendService.post('/contact', this.form, null).subscribe((res) => {
      this.alertController
        .create({
          header: 'Success',
          message: 'Your message has been sent',
          buttons: ['OK'],
        })
        .then((alert) => {
          alert.present();
        });

      this.form.subject = '';
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    });

    return true;
  }
}
