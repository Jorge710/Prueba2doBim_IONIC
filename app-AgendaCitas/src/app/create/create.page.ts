import { Component, OnInit } from '@angular/core';

//importamos
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { TareasService } from './../shared/tareas.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  bookingForm: FormGroup;

  constructor(
    private aptService: TareasService,
    private router: Router,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.bookingForm = this.fb.group({
      name: [''],
      description: [''],
      date: ['']
    })
  }

  formSubmit() {
    if (!this.bookingForm.valid) {
      return false;
    } else {
      this.aptService.createBooking(this.bookingForm.value).then(res => {
        console.log(res)
        this.bookingForm.reset();
        this.router.navigate(['/home']);
      })
        .catch(error => console.log(error));
    }
  }
  
}
