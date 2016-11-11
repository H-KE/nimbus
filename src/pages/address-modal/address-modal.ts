import { Component,
         ElementRef,
         ViewChild,
         ChangeDetectorRef,
         NgZone } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

declare var google;

@Component({
  selector: 'address-modal',
  templateUrl: 'address-modal.html'
})
export class AddressModalPage {
  errorMessage: string;
  autoComplete: any;
  addressForm: any;
  placeSelected: boolean;

  @ViewChild('autoComplete') autoCompleteInput;
  @ViewChild('secondaryInput') secondaryInput;

  constructor(public viewCtrl: ViewController,
              public formBuilder: FormBuilder,
              public changeDetect: ChangeDetectorRef,
              public zone: NgZone) {
    this.placeSelected = false;
    this.addressForm = {
      street_number: '',
      route: '',
      primary: '',
      secondary: '',
      locality: '',
      administrative_area_level_1: '',
      postal_code: ''
    };
  }

  ionViewDidLoad() {
    //Do not use this for modals
  };

  ngAfterViewInit() {
    let options = {
      types: ['address'],
      componentRestrictions: {country: 'ca'}
    };
    let self = this;
    this.autoComplete = new google.maps.places.Autocomplete(this.autoCompleteInput.getNativeElement().getElementsByTagName('input')[0], options);
    this.autoComplete.addListener('place_changed', () => {
      self.zone.run(() => {
        var place = this.autoComplete.getPlace();
        // // console.log(place);

        place.address_components.forEach(function(component) {
          var addressType = component.types[0];
          if (addressType in self.addressForm) {
            self.addressForm[addressType] = component.long_name;
          }
        });

        self.addressForm.primary = self.addressForm.street_number + ' ' + self.addressForm.route;
        self.secondaryInput.getNativeElement().getElementsByTagName('input')[0].focus();
      })
    });
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  save() {
    this.addressForm.city = this.addressForm.locality;
    this.addressForm.province = this.addressForm.administrative_area_level_1;
    this.viewCtrl.dismiss(this.addressForm);
  }

  remove() {
    this.viewCtrl.dismiss();
  }

}
