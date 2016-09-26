import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
// import {GoogleMap, GoogleMapsEvent, GoogleMapsLatLng, GoogleMapsMarkerOptions} from 'ionic-native';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {Dispensary} from '../../models/dispensary'

import {DispensaryPage} from '../dispensary/dispensary'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';

@Component({
  templateUrl: 'build/pages/search/search.html',
  providers: [DispensaryService]
})

export class SearchPage {
  placeholder: string;
  dispensaries: any;
  searchMode: string;
  // map: GoogleMap;
  //
  // zoom: number = 15;
  //
	// lat: number = -37.7863713;
  // lng: number = 175.2796333;

  constructor(private dispensaryService: DispensaryService,
              public navCtrl: NavController,
              private platform: Platform,
              private _zone: NgZone,
              private cartService: CartService) {
    this.placeholder = "Search for a dispensary";
    this.searchMode = "mail";

    this.dispensaryService.getDispensaries(this.searchMode).then(response => {
      this.dispensaries = response;
    });
    this.platform.ready().then(() => this.onPlatformReady());
  }

  private onPlatformReady(): void {

  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }
  //
  // ngAfterViewInit() {
  //   GoogleMap.isAvailable().then(() => {
  //
  //     this.map = new GoogleMap('map_canvas');
  //
  //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
  //       () => this.onMapReady(),
  //       () => alert("Error: onMapReady")
  //     );
  //
  //     this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
  //       (data: any) => {
  //         alert("GoogleMap.onMapReady(): ");
  //       },
  //       () => alert("Error: GoogleMapsEvent.MAP_READY")
  //     );
  //
  //     this.map.one(GoogleMapsEvent.MAP_READY).then((data: any) => {
  //       alert("GoogleMap.onMapReady(): " + JSON.stringify(data));
  //
  //       this._zone.run(() => {
  //         let myPosition = new GoogleMapsLatLng(38.9072, -77.0369);
  //         console.log("My position is", myPosition);
  //         this.map.animateCamera({ target: myPosition, zoom: 10 });
  //       });
  //
  //     });
  //   });
  // }
  // private onMapReady(): void {
  //   alert('Map ready');
  //   //this.map.setOptions(mapConfig);
  // }
  //
  // clickedMarker(label: string, index: number) {
	// 	console.log(`clicked the marker: ${label || index}`)
	// }
  //
	// markers: any[] = [
	// 	{
	// 	  lat: -37.7863713,
	// 	  lng: 175.2796333,
	// 	  draggable: false,
	// 	  icon: 'http://cdn.theweedblog.com/wp-content/uploads//Medical-Marijuana2.jpg'
	// 	},
	// 	{
	// 	  lat: -37.8253519,
	// 	  lng: 175.30493468,
	// 	  draggable: false,
	// 	  icon: 'http://www.cannabistherapyinstitute.com/images/cross.only.gif'
	// 	},
	// 	{
	// 	  lat: -37.86853098,
	// 	  lng: 175.26411709,
	// 	  draggable: false,
	// 	  icon: 'http://sites.middlebury.edu/middmag/files/2012/10/high-line-logo.jpeg'
	// 	},
	// 	{
	// 	  lat: -37.85358475,
	// 	  lng: 175.32038055,
	// 	  draggable: false,
	// 	  icon: 'http://static1.squarespace.com/static/50414a88e4b0b97fe5a56a39/t/53695564e4b0e9a5f9b53913/1399412070542/'
	// 	}
	// ];
}
