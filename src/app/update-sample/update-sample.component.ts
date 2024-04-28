import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { DatabaseService } from '../service/database/database.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  MatFormFieldModule,
  FloatLabelType,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SampleService } from '../service/sample/sample.service';

@Component({
  selector: 'app-update-sample',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
  templateUrl: './update-sample.component.html',
  styleUrl: './update-sample.component.scss',
})
export class UpdateSampleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private sampleService: SampleService,
  ) {
    this.updateSample = this.formBuilder.group({
      image: new FormControl(''),
      styleNumber: new FormControl(''),
      description: new FormControl(''),
      dateReceived: new FormControl(''),
      returnToVendor: new FormControl(false),
    });
  }

  sampleStyleNumber = "";
  sampleData: any;

  floatLabelControl = new FormControl('auto' as FloatLabelType);
  // from docs
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  updateSample = new FormGroup({
    image: new FormControl<string>(''),
    styleNumber: new FormControl<string>(''),
    description: new FormControl<string>(''),
    dateReceived: new FormControl<string>(''),
    returnToVendor: new FormControl<boolean>(false),
  });

  onSubmit() {
    this.updateSample.markAllAsTouched();
    const isFormValid = this.updateSample.valid;
    let isDatabaseUpdated = false;
    this.databaseService
      .updateSample(this.sampleStyleNumber, this.updateSample.value)
      .subscribe(
        (res: any) => {
          isDatabaseUpdated = true;
          // From YouTube tutorial on how to reload component
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate(['./'], {
            relativeTo: this.route,
          });
          if (isFormValid && isDatabaseUpdated) {
            this._snackBar.open('Sample Successfully Updated', 'Close', {
              duration: 3000,
            });
            this.dialog.closeAll();
          }
        },
        (error) => {
          this._snackBar.open(`Could not update sample: ${error}`, 'Close', {
            duration: 3000,
          });
          this.dialog.closeAll();
        }
      );
  }

  fetchSampleData(styleNumber: string): void {
    this.databaseService.getSampleByStyleNumber(styleNumber).subscribe(
      (data: any) => {
        this.sampleData = data;
        // Update the form controls with the fetched sample data
        this.updateSample.patchValue({
          image: this.sampleData.image,
          styleNumber: this.sampleData.styleNumber,
          description: this.sampleData.description,
          dateReceived: this.sampleData.dateReceived,
          returnToVendor: this.sampleData.returnToVendor,
        });
      },
      (error) => {
        console.error('Error fetching sample data:', error);
      }
    );
  }

  ngOnInit(): void {
    this.sampleService.currentStyleNumber.subscribe((styleNumber) => {
      this.sampleStyleNumber = styleNumber;
      if (this.sampleStyleNumber) {
        this.fetchSampleData(this.sampleStyleNumber);
      }
    });
  }
}
