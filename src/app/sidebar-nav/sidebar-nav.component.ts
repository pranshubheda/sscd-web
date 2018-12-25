import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { UserDataService } from "../user-data.service";
import { resolveDefinition } from '@angular/core/src/view/util';

@Component({
  selector: "app-sidebar-nav",
  templateUrl: "./sidebar-nav.component.html",
  styleUrls: ["./sidebar-nav.component.css"]
})
export class SidebarNavComponent {
  
  lat: number = 93.08492480777204;
  lng: number = -27.65527105890214;
  users: Object;
  user_id_selected: string = null;
  
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));
    
    constructor(
      private breakpointObserver: BreakpointObserver,
      private userDataService: UserDataService
    ) {}

    ngOnInit() {
    this.userDataService.getUsers().subscribe((res) => {
      this.users = res;
      console.log(this.users);
    });
    
  }
  
  userClicked(user_id) {
    this.user_id_selected = user_id;

    this.userDataService.getUserLocation(user_id).subscribe((userLocation) => {
      this.lat = parseFloat(userLocation.latitude);
      this.lng = parseFloat(userLocation.longitude);
      console.log(this.lat);
      console.log(this.lng);
    });
  }
}