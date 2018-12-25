import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"; // Import it up here
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class UserDataService {
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get("http://localhost:5656/api/users");
  }

  getUserLocation(user_id) {
    var user_id_json = {
      'user_id': user_id
    }
    return this.http.post<Location>("http://localhost:5656/api/userlocation",JSON.stringify(user_id_json), httpOptions);
  }
}

interface Location {
  latitude: string,
  longitude: string,
}

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':  'application/json',
  })
};
