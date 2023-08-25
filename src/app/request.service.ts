import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public request: any = {
    namespace: 'gozo-car-rental',
  };

  constructor(private backendService: BackendService) {}

  set(key: any, value: any) {
    this.request[key] = value;
  }

  get(key: any) {
    return this.request[key] || null;
  }

  async submit() {
    return await new Promise((resolve, reject) => {
      this.backendService
        .post('/send', this.request, null)
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        }, reject);
    });
  }
}
