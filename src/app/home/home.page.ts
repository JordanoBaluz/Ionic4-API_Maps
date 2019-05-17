import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
import { AfterContentInit, Component, OnInit, ViewChild, enableProdMode } from '@angular/core';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  LatLng
} from '@ionic-native/google-maps';
import {
  ToastController,
  Platform,
  LoadingController,
  NavController
} from '@ionic/angular';
declare var google;
var x = document.getElementById("map");
var map, infoWindow;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage{
  
  constructor (private geolocation:Geolocation,
    ){}
    //inicializa o mapa ao iniciar o programa
    ngOnInit(){
      initMap();
    }
}
//inicializa o mapa e monta o mesmo
  function initMap() {
    const myLatLng = {lat: -2.90393, lng: -41.7763};
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: 16,
      center: myLatLng,
      mapTypeId: 'roadmap',
      disableDefaultUI: true,
      zoomControl: true
    });
    //função para reconhcer clique no mapa e inserir uma marker
    map.addListener('click', function(e) {
      placeMarkerAndPanTo(e.latLng, map);
    });
  }
  //função que coloca uma marker no local clicado e recebe a lat e lng
  function placeMarkerAndPanTo(latLng, map) {
    //chama e exibe janela para denuncias
    var input = new google.maps.InfoWindow({
      content: document.getElementById('inInfo')
    });
    //coloca o marcador no mapa
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    //ler o local clicado e coloca o marcador
    map.panTo(latLng);
    //salvar opção selecionada na denuncia e latlng
      marker.addListener('click', function(){
      input.open(map, marker);
    });
  }
  infoWindow = new google.maps.InfoWindow;
  if(navigator.geolocation){
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };
    navigator.geolocation.getCurrentPosition(function(position){
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      infoWindow.setPosition(pos);
      //infoWindow.open(map);
      map.setCenter(pos);
      
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    }, options);
  }else {
    //broser doesn't support geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
  function handleLocationError(browserHasGeolocation, infoWindow,pos){
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesnt support geolocation.');
      infoWindow.open(map);
    }
