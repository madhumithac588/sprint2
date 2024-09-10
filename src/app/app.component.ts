import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CollegeService, College } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'college-module';
  collegeDetails: College[] = [];
  collegeToUpdate: College = { id: undefined, name: "", address: "", city: "", state: "" };

  constructor(private collegeService: CollegeService) {
    this.getCollegeDetails();
  }

  register(registerForm: NgForm) {
    this.collegeService.registerCollege(registerForm.value).subscribe(
      (resp: College) => {
        console.log(resp);
        registerForm.reset();
        this.getCollegeDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  getCollegeDetails() {
    this.collegeService.getColleges().subscribe(
      (resp: College[]) => {
        console.log(resp);
        this.collegeDetails = resp;
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  deleteCollege(college: College) {
    this.collegeService.deleteCollege(college.id!).subscribe(
      () => {
        this.getCollegeDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }

  edit(college: College) {
    this.collegeToUpdate = { ...college };
  }

  updateCollege() {
    this.collegeService.updateCollege(this.collegeToUpdate).subscribe(
      (resp: College) => {
        console.log(resp);
        this.getCollegeDetails();
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
