import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { DatabaseService } from '../service/database/database.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  MatFormFieldModule,
  FloatLabelType,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatDialogModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialog,
} from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sample',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatCheckboxModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './add-sample.component.html',
  styleUrl: './add-sample.component.scss',
})
export class AddSampleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) {}

  databaseSamples: any[] = [];

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  // from docs
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  addSample = new FormGroup({
    image: new FormControl<string>(''),
    styleNumber: new FormControl<string>(''),
    description: new FormControl<string>(''),
    dateReceived: new FormControl<string>(''),
    returnToVendor: new FormControl<boolean>(false),
  });

  onSubmit() {
    this.addSample.markAllAsTouched();
    const isFormValid = this.addSample.valid;
    let isAddedToDatabase = false;
    this.databaseSamples.push(this.addSample.value);
    if (isFormValid) {
      this.databaseService
        .addSample(this.addSample.value)
        .subscribe((res: any) => {
          isAddedToDatabase = true;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['./'], {
            relativeTo: this.route,
          });
        });
        
    }
    console.log(`IsFormValid: ${isFormValid}`);
    console.log(`IsAddedToDatabase: ${isAddedToDatabase}`);
    if (isFormValid && isAddedToDatabase) {
      this._snackBar.open('Item Successfully Added', 'Close', {
        duration: 3000,
      });
      this.dialog.closeAll();
    }
  }

  ngOnInit(): void {
    this.addSample = this.formBuilder.group({
      image: ['', Validators.required],
      styleNumber: ['', Validators.required],
      description: ['', Validators.required],
      dateReceived: ['', Validators.required],
      returnToVendor: [false, Validators.required],
    });
  }
}
