import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  FormControl,
  Validators,
} from '@angular/forms';

interface Options {
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
  appStatuses: Array<Options> = [
    {
      name: 'ADD COMPLIANCE INFO SUBMITTED BY ADMIN',
      value: 'ADD_COMPLIANCE_INFO_SUBMITTED_BY_ADMIN',
    },
    { name: 'ADD INFO NOTIFICATION DONE', value: 'ADD_INFO_NOTIFICATION_DONE' },
    {
      name: 'ADDITIONAL COMPLIANCE INFO PROVIDED',
      value: 'ADDITIONAL_COMPLIANCE_INFO_PROVIDED',
    },
    {
      name: 'ADDITIONAL COMPLIANCE INFO REQ',
      value: ' ADDITIONAL_COMPLIANCE_INFO_REQ',
    },
    { name: 'BIRTH INFO COLLECTED', value: 'BIRTH_INFO_COLLECTED' },
    { name: 'CANCELLED', value: 'CANCELLED' },
    { name: 'CAPTURED EID', value: 'CAPTURED_EID' },
    { name: 'CARD ACTIVATED', value: 'CARD_ACTIVATED' },
    { name: 'CLOSED', value: 'CLOSED' },
    { name: 'EID EXPIRED', value: 'EID_EXPIRED' },
    { name: 'EID FAILED', value: 'EID_FAILED' },
    { name: 'EID RESCAN REQ', value: 'EID_RESCAN_REQ' },
    { name: 'EID UPDATED', value: 'EID_UPDATED' },
    { name: 'EMP INFO COMPLETED', value: 'EMP_INFO_COMPLETED' },
    { name: 'FATCA GENERATED', value: 'FATCA_GENERATED' },
    { name: 'FIRST KYC FAILED', value: 'FIRST_KYC_FAILED' },
    {
      name: 'FSS PREJECTEDROFILE UPDATED',
      value: 'FSS_PREJECTEDROFILE_UPDATED',
    },
    { name: 'FSS PROFILE UPDATED', value: 'FSS_PROFILE_UPDATED' },
    { name: 'HARD KYC DONE', value: 'HARD_KYC_DONE' },
    { name: 'CAPTURED ADDRESS', value: 'MEETING_SCHEDULED' },
    { name: 'MEETING SUCCESS', value: 'MEETING_SUCCESS' },
    { name: 'ONBOARDED', value: 'ON_BOARDED' },
    { name: 'OPS REVIEW REQUIRED', value: 'OPS_REVIEW_REQUIRED' },
    { name: 'PHYSICAL CARD ORDERED', value: 'PHYSICAL_CARD_ORDERED' },
    { name: 'REJECTED', value: 'REJECTED' },
    { name: 'SECOND KYC FAILED', value: 'SECOND_KYC_FAILED' },
    { name: 'SOFT KYC DONE', value: 'SOFT_KYC_DONE' },
    { name: 'SOFT KYC FAILED', value: 'SOFT_KYC_FAILED' },
  ];
  additionalCriterias: Array<Options> = [
    { name: 'Work Item no. is blank', value: 'a.work_item_no IS NULL' },
    {
      name: 'Employment Status is Blank',
      value: 'e.employment_status IS NULL',
    },
    { name: 'Employment information is blank', value: '' },
    { name: 'Salary is blank', value: 'e.monthly_salary IS NULL' },
    { name: 'Monthly Deposit is blank', value: '' },
    {
      name: `Excluding Kyc Amendment Status 'SUBMIT_TO_BANK' for all the above Status`,
      value: '',
    },
    { name: 'Date considered is application status update -Date', value: '' },
    {
      name: 'Account and card are not in activated status',
      value: 'u.status <> ACTIVE OR u.status IS NULL',
    },
    {
      name: 'Sanction County- Nigerian(NGA) Syria(SYR), Sudan, Cuba (CUB), North Korea(PRK, KOR), Crimea, Iran(IRN), and Belarus(BLR) are excluded',
      value:
        '(c.nationality IS NULL OR c.nationality NOT IN (SYR, CUB, PRK, KOR, IRN, BLR, Crimea, Sudan))',
    },
  ];

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      file: new FormControl('', [Validators.required]),
      withOptions: new FormControl(false),
    });
  }

  statusCheckboxHandler(e: any) {
    const selectedStatus = this.form.controls['selectedStatus'] as FormArray;
    if (e.target.checked) {
      selectedStatus.push(new FormControl(e.target.value));
    } else {
      const index = selectedStatus.controls.findIndex(
        (x) => x.value === e.target.value
      );
      selectedStatus.removeAt(index);
    }
  }

  criteriaCheckboxHandler(e: any) {
    const selectedCriteria = this.form.controls[
      'selectedCriteria'
    ] as FormArray;
    if (e.target.checked) {
      selectedCriteria.push(new FormControl(e.target.value));
    } else {
      const index = selectedCriteria.controls.findIndex(
        (x) => x.value === e.target.value
      );
      selectedCriteria.removeAt(index);
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

  showOptions() {
    this.form = this.fb.group({
      nrOfDays: new FormControl(''),
      selectedStatus: new FormArray([]),
      selectedCriteria: new FormArray([]),
      file: new FormControl('', [Validators.required]),
      withOptions: new FormControl(false),
    });
    this.form.controls['withOptions'].setValue(true);
  }

  showNoOptions() {
    this.form = this.fb.group({
      file: new FormControl('', [Validators.required]),
      withOptions: new FormControl(false),
    });
    this.form.controls['withOptions'].setValue(false);
  }

  submit() {
    console.log(this.form.value);
  }
}
