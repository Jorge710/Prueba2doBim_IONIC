import { Component ,OnInit } from '@angular/core';

//importamos
import { Tareas } from '../shared/Tareas';
import { TareasService } from './../shared/tareas.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  Bookings = [];

  constructor(
    private aptService: TareasService
  ) {}

  ngOnInit() {
    this.fetchBookings();
    let bookingRes = this.aptService.getBookingList();
    bookingRes.snapshotChanges().subscribe(res => {
      this.Bookings = [];
      res.forEach(item => {
        let a = item.payload.toJSON();
        a['$key'] = item.key;
        this.Bookings.push(a as Tareas);
      })
    })
  }

  fetchBookings() {
    this.aptService.getBookingList().valueChanges().subscribe(res => {
      console.log(res)
    })
  }

  deleteBooking(id) {
    console.log(id)
    if (window.confirm('De verdad quieres eliminar?')) {
      this.aptService.deleteBooking(id)
    }
  }

}
