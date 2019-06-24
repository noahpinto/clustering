import { Component } from '@angular/core';
import {} from 'googlemaps';
import { ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as MarkerClusterer from "@google/markerclusterer"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
 public curlatlong;
  title = 'ag';
  @ViewChild('map') mapElement: any;
 map: google.maps.Map;
columnDefs = [
  {headerName: 'value', field: 'value',sortable: true, filter: true,checkboxSelection: true },
  {headerName: 'label', field: 'label',sortable: true, filter: true },
  {headerName: 'lat', field: 'lat',sortable: true, filter: true},
  {headerName: 'long', field: 'long',sortable: true, filter: true}
];

rowData: any;

markers:any;

constructor(private http: HttpClient) {

  this.rowData=this.http.get('https://private-37ba9-assignment39.apiary-mock.com/venues') ;
  this.http.get('https://private-37ba9-assignment39.apiary-mock.com/venues').subscribe(data=>
{
  
  for(let i=0;data;i++){

   
this.curlatlong = new google.maps.LatLng(data[i].lat, data[i].long);
  
      let marker;
      marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.curlatlong
    });
    let content = "<h4> " + data[i].label + "</h4>";
    this.addInfoWindow(marker, content);
 
  // var mcOptions = {
  //   imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m1.png' };
  // var markerCluster = new MarkerClusterer(this.map, marker, mcOptions);
    
   
  }
  

}
);
 
      }

      addInfoWindow(marker, content) {
        let infoWindow = new google.maps.InfoWindow({
          content: content
        });
    
        google.maps.event.addListener(marker, 'click', () => {
          infoWindow.open(this.map, marker);
        });
        
       
    
      }

ngOnInit(): void {
  const mapProperties = {
    center: new google.maps.LatLng(49.200007, -2.1136679999999615),
    zoom: 4,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

this.map = new google.maps.Map(this.mapElement.nativeElement,mapProperties);
}
}
