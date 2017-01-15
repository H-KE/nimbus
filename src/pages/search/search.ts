import {Component, NgZone} from '@angular/core';
import {NavController, NavParams, Platform, LoadingController, MenuController} from 'ionic-angular';

import {Dispensary} from '../../models/dispensary'

import {DispensaryPage} from '../dispensary/dispensary'
import {CartPage} from '../cart/cart';

import {CartService} from '../../providers/cart/cart';
import {DispensaryService} from '../../providers/dispensary/dispensary';
import { SideMenuService } from '../../providers/side-menu/side-menu'

import _ from 'lodash'

@Component({
  selector: 'search',
  templateUrl: 'search.html'
})

export class SearchPage {
  pickupDispensaries: any;
  mailDispensaries: any;
  searchMode: string;

  constructor(public dispensaryService: DispensaryService,
              public navCtrl: NavController,
              public platform: Platform,
              public _zone: NgZone,
              public cartService: CartService,
              public loadingCtrl: LoadingController,
              public menuCtrl: MenuController,
              public sideMenu: SideMenuService) {
  }

  public ionViewDidLoad(): void {
    this.menuCtrl.swipeEnable(true);
    this.searchMode = "mail";
    this.loadDispensaries();

    this.sideMenu.loadSideMenu();
  }

  loadDispensaries() {
    var loader = this.loadingCtrl.create({
      content: "Finding Shops...",
    });
    loader.present();

    let response =
    [
       {
          "id":5,
          "name":"StashClub",
          "address":"",
          "bio":"Free shipping • Premier • $$ ",
          "description":"Our goal is to be your shopping destination for premium shaving and grooming products. We strive to meet all of your personal care needs. Here you’ll find the softest English-made badger hair brushes and the richest shaving creams in every scent you can imagine. Plus, we’ve travelled the world to stock a wide collection of unique, hard-to-find oils, moisturizers, and grooming accessories you won't find anywhere else",
          "avatar_url":"https://s3.amazonaws.com/media.nimbusfly.co/default/sclogo.png",
          "shipping_fee":"15.0",
          "free_shipping_cap":"50.0",
          "medical":false,
          "pickup":false,
          "mail":true,
          "delivery":false,
          "phone_number":"6045004416",
          "products":[
             {
                "id":1109,
                "retailer_id":5,
                "name":"JACK DEAN EAU DE QUININE HAIR TONIC",
                "images":[
                   "https://cdn.shopify.com/s/files/1/0812/3241/products/JD-QUIN250.jpg?v=1480622693"
                ],
                "thumbnail":null,
                "prices":[
                   30
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Move the mousse and replace your hair care regimen with a classic hair tonic, which treats more than some other hair products and benefits your hair and your scalp. Formulated to stimulate and invigorate, Jack Dean’s Eau De Quinine has a floral aroma of jasmine and lily of the valley with macadamia oil, citrus and vanilla notes.",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"Tonic"
             },
             {
                "id":1110,
                "retailer_id":5,
                "name":"FEN-STEEL-H03",
                "images":[
                   "https://cdn.shopify.com/s/files/1/0812/3241/products/FENRH1PH1H03_Fendrihan_Stainless_Steel_Safety_Razor3.jpg?v=1464293192"
                ],
                "thumbnail":null,
                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Bold and brave, the Adventurer isn’t afraid to take charge. You live life on your own terms, and you need a razor that can keep up with you. Strong, masculine lines and a stark contrast between the hand-polished steel gullies and the raised textured handle make the Adventurer an intrepid addition to your collection.",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"Razor"
             },
             {
                "id":1111,
                "retailer_id":5,
                "name":"PEREGRINE SUPPLY CO PRE-SHAVE OIL, SANDALWOOD",
                "images":[
                   "https://cdn.shopify.com/s/files/1/0812/3241/products/12-Final.jpg?v=1480715156"
                ],
                "thumbnail":null,

                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Before picking up your razor to begin shaving, protect your skin with Peregrine’s Supply Company’s Preshave Oil. Scented with sandalwood and made with three simple and natural ingredients - avocado oil, castor oil, and essential oils- just a few drops will soften hair and give you a close and pleasant shave. Pair with Shave and Face Soap for best results. ",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"After Shave"
             }
          ]
       },
       {
          "id":7,
          "name":"Mackage",
          "address":"Hamilton, ON",
          "bio":"Free shipping • Luxury • $$$$ ",
          "description":"Mackage collections are creatively designed with sexy detailing and tailored cuts in leather, puffy and wool, made to compliment any silhouette. After many successful years in the outerwear business for men and women, Mackage has expanded, in 2012, into children outerwear with their Mackage Mini collection. In 2013, Eran and Elisa have introduced their handbag collection which furthered Mackage’s evolution into a full lifestyle brand.",
          "avatar_url":"https://i.ytimg.com/vi/Mym-2yM0K_M/maxresdefault.jpg",
          "shipping_fee":"21.0",
          "free_shipping_cap":"350.0",
          "medical":false,
          "pickup":false,
          "mail":true,
          "delivery":false,
          "phone_number":"647-853-8697",
          "products":[
             {
                "id":1177,
                "retailer_id":7,
                "name":"Adali",
                "images":[
                   "https://i0.static-shopcade.com/580x580x000xc.s./000000000000000000000000xxxyiw/aHR0cHM6Ly9zYy1wcm9kdWN0LWltYWdlcy5zMy5hbWF6b25hd3MuY29tLzU3LzU3YTFjY2MxYmM5NTM4NGI2Y2E1NGVlNS04OTdkYzJjZmMwYzA4NDk1YjBlYWU3MTdjZGQ4NDMwNGMyOTkyNTI2LmpwZw%3D%3D/mackage-adali-coat-black",
                   "https://cdnd.lystit.com/200/250/tr/photos/2011/10/07/mackage-grey-adali-coat-product-1-2171012-410942871.jpeg"
                ],
                "thumbnail":null,

                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"ADALI by MACKAGE is a hip length, classic down coat with a nipped waist for sleek silhouette. Features signature collar with natural Asiatic raccoon fur trim. Asymmetrical zip closure and hidden toggle closure at hood provide extra warmth. Signature leather pocket and closure trim with matte black metaluxe zippers add a sophisticated finish to this statement piece. Matte black zippers on all colorways. Available in red, ink, army, bordeaux, and black.",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"Women"
             },
             {
                "id":1175,
                "retailer_id":7,
                "name":"Dixon",
                "images":[
                   "https://cdna.lystit.com/photos/2013/11/18/mackage-navy-classic-bomber-puffy-coat-product-1-14936722-194068569.jpeg",
                   "https://cdn.shopify.com/s/files/1/0519/4813/products/Dixon5_600x.jpg?v=1478728289"
                ],
                "thumbnail":null,

                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"DIXON by MACKAGE is a luxurious bomber-style, heavyweight down-filled jacket for men. Natural rabbit hood fur lining and natural Asiatic raccoon fur trim at oversize hood. Removable down-filled inner bib and collar. Napoleon pocket with leather welt and zipper. Rib knit cuff and hem for snug fit. Signature leather trims. Nickel hardware on black and army, gold tone hardware on navy. Available in black, army, and navy.",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"Men"
             },
             {
                "id":1176,
                "retailer_id":7,
                "name":"TAZ WOOL BEANIE",
                "images":[
                   "https://cdnc.lystit.com/photos/2013/08/10/mackage-grey-deep-grey-ladder_knit-taz-beanie-product-3-12644989-516306244.jpeg",
                   "https://thingd-media-ec2.thefancy.com/default/172866639727957112_5a12bb20d6c5.jpg"
                ],
                "thumbnail":null,

                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Taz by Mackage is a subtly distressed all-wool rib-knit beanie for men. Available in black and charcoal.",
                "thc":"0.0",
                "cbd":"0.0",
                "subspecies":null,
                "category":"Accessories"
             }
          ]
       },
       {
          "id":1,
          "name":"Alair",
          "address":"588 Dufferin Street, M4A 2M5",
          "bio":"Free shipping • Style • $$$ ",
          "description":"Extend the good life to the air you breathe. With a subtle profile and a joyful disposition, an Alair vaporizer is enjoyable, portable and rarely out of place. Whatever your lifestyle, just plug, vape and play.",
          "avatar_url":"https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad32b3f8baf35958c26d38/56b93a2f01dbae64ff7226d5/1456210131673/279A6571.jpg?format=500w",
          "shipping_fee":"15.0",
          "free_shipping_cap":"100.0",
          "medical":false,
          "pickup":false,
          "mail":true,
          "delivery":false,
          "phone_number":"6474624663",
          "products":[
             {
                "id":2,
                "retailer_id":1,
                "name":"Girl Scout Cookies - Filled Cartridge",
                "images":[
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/577d1cc0ff7c50f540e26b7b/1467817153466/279A6192%2Bsingle.jpg?format=1500w",
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/577d1cbcff7c50f540e26b5e/1467817149101/1cartridge.jpg?format=1500w"
                ],
                "thumbnail":null,
                "prices":[
                   65
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Each cartridge comes filled with 150+ draws, and is easy to load into your existing Alair vaporizer.\n\nGirl Scout Cookies Quad A Buds used to give testing results in each:\n (THC) Tetrahydrocannabinol: 274mg(68%) 1.82mg Per Draw\n (CBD) Cannabidiol: 1.4mg(0.35%) 0.01mg Per Draw\n (CBN) Cannabinol: 0mg(0%) 0.00mg Per Draw\n\n Ingredients: Pure CO2 Extracted Cannabis Oil Processed with Food Grade Ethanol.",
                "thc":"68.0",
                "cbd":"0.35",
                "subspecies":"Hybrid",
                "category":"Cartridges"
             },
             {
                "id":3,
                "retailer_id":1,
                "name":"Quantum Kush - Filled Cartridge",
                "images":[
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/577d1cc0ff7c50f540e26b7b/1467817153466/279A6192%2Bsingle.jpg?format=1500w",
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/577d1cbcff7c50f540e26b5e/1467817149101/1cartridge.jpg?format=1500w"
                ],
                "thumbnail":null,
                "prices":[
                   65
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Each cartridge comes filled with 150+ draws, and is easy to load into your existing Alair vaporizer.\n\n Quantum Kush (Sativa Phenotype) Quad A Buds used to give testing results in each:\n (THC) Tetrahydrocannabinol: 262mg(61.9%) 1.82mg Per Draw\n (CBD) Cannabidiol: 3.11mg(3%) 0.01mg Per Draw\n (CBN) Cannabinol: 0mg(0%) 0.00mg Per Draw\n\n Ingredients: Pure CO2 Extracted Cannabis Oil Processed with Food Grade Ethanol.",
                "thc":"62.0",
                "cbd":"3.0",
                "subspecies":"Hybrid",
                "category":"Cartridges"
             },
             {
                "id":1,
                "retailer_id":1,
                "name":"Vaporizer Starter Kit",
                "images":[
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/582b832615d5db457f0c55f9/1479246633034/279A60111.jpg?format=1000w",
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/56cbf7f11bbee05e52d8373e/1479246719635/279A6219.jpg?format=1000w",
                   "https://static1.squarespace.com/static/56ad28197da24fafb23f972c/56ad354489a60aa6dae3a3c8/582b834415d5db457f0c580c/1479246719636/IMG_0595.jpg?format=1000w"
                ],
                "thumbnail":null,
                "prices":[
                   100
                ],
                "price_labels":[
                   "each"
                ],
                "description":"Dressed all in black with a touch of gold, the classic ALAIR Vaporizers are well-suited to any occasion. Each vaporizer comes with a filled cartridge that will last 150+ draws and USB charger adaptor.",
                "thc":"68.0",
                "cbd":"0.35",
                "subspecies":"",
                "category":"Vaporizers"
             }
          ]
        }
    ]
    let dispensaries = this.orderDispensariesByReadiness(response);
    this.mailDispensaries = _.filter(dispensaries, function(dispensary) {
      return dispensary.mail == true;
    });
    this.mailDispensaries = _.chunk(this.mailDispensaries, 3)

    this.pickupDispensaries = _.filter(dispensaries, function(dispensary) {
      return dispensary.pickup == true;
    });
    this.pickupDispensaries = _.chunk(this.pickupDispensaries, 3)
    loader.dismiss();
  }

  clearDispensaries() {
    this.mailDispensaries = null;
    this.pickupDispensaries = null;
  }

  orderDispensariesByReadiness(dispensaries) {
    let comingSoons = _.filter(dispensaries, function(dispensary) {
      return dispensary.bio == 'Coming soon';
    });
    let goodToGos =  _.filter(dispensaries, function(dispensary) {
      return dispensary.bio != 'Coming soon' && dispensary.bio != 'Hidden';
    });
    return goodToGos.concat(comingSoons);
  }

  dispensarySelected(event, dispensary) {
    this.navCtrl.push(DispensaryPage, {
      dispensary: dispensary,
      dispensaryId: dispensary.id
    });
  }

  goToCart() {
    this.navCtrl.push(CartPage);
  }

  firstToUpperCase( str: String ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1);
  }
}
