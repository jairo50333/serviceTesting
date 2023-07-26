import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapsService {

  constructor() { }
  center = { lat: 0, long: 0 }

  getCurrentPosition() {
    navigator.geolocation.getCurrentPosition(
      (response) => {
        const { latitude, longitude } = response.coords;
        console.log(response.coords);
        
        this.center = { lat: latitude, long: longitude }

      }

    );
  }
}
