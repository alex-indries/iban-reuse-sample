import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

interface Country {
  name: string;
  value: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup | any;
  countries: Array<Country> = [
    { name: 'USER VERIFIED', value: 'ON_BOARD' },
    { name: 'CAPTURED EID', value: 'CAPTURED_EID' },
    { name: 'FSS PROFILE UPDATED', value: 'FSS_PROFILE_UPDATED' },
    { name: 'CAPTURED ADDRESS', value: 'MEETING_SCHEDULED' },
    { name: 'BIRTH INFO COLLECTED', value: 'BIRTH_INFO_COLLECTED' },
    { name: 'FATCA GENERATED', value: 'FATCA_GENERATED' },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      nrOfDays: new FormControl('', [Validators.required]),
      selectedOptions: new FormArray([]),
      file: new FormControl(''),
    });
  }

  onCheckboxChange(e: any) {
    const selectedOptions = this.form.controls['selectedOptions'] as FormArray;
    if (e.target.checked) {
      selectedOptions.push(new FormControl(e.target.value));
    } else {
      const index = selectedOptions.controls.findIndex(
        (x) => x.value === e.target.value
      );
      selectedOptions.removeAt(index);
    }
  }

  getFile(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.form.controls['file'].setValue(reader.result);
      console.log(reader.result);
    };
    // this.form.controls['file'].setValue(e.target.files[0]);
  }

  submit() {
    console.log(this.form.value);
  }
}
