import { Injectable } from '@angular/core';

//importamos
import { Tareas } from '../shared/Tareas';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  bookingListRef: AngularFireList<any>;
  bookingRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) { }

  // Create
  createBooking(apt: Tareas) {
    return this.bookingListRef.push({
      name: apt.name,
      description: apt.description,
      date: apt.date
    })
  }

  // Get Single
  getBooking(id: string) {
    this.bookingRef = this.db.object('/tarea/' + id);
    return this.bookingRef;
  }

  // Get List
  getBookingList() {
    this.bookingListRef = this.db.list('/tarea');
    return this.bookingListRef;
  }

  // Update
  updateBooking(id, apt: Tareas) {
    return this.bookingRef.update({
      name: apt.name,
      description: apt.description,
      date: apt.date
    })
  }

  // Delete
  deleteBooking(id: string) {
    this.bookingRef = this.db.object('/tarea/' + id);
    this.bookingRef.remove();
  }

}
