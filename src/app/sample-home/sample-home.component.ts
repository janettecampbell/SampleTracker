import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database/database.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddSampleComponent } from '../add-sample/add-sample.component';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateSampleComponent } from '../update-sample/update-sample.component';
import { SampleService } from '../service/sample/sample.service';

@Component({
  selector: 'app-sample-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, AddSampleComponent, MatSort],
  templateUrl: './sample-home.component.html',
  styleUrl: './sample-home.component.scss',
})
export class SampleHomeComponent implements OnInit {
  databaseSamples: any[] = [];

  tableDisplayColumns = [
    'image',
    'styleNumber',
    'description',
    'dateReceived',
    'returnToVendor',
    'actions',
  ];

  constructor(
    private databaseService: DatabaseService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private sampleService: SampleService
  ) {}

  openDialog(): void {
    this.dialog.open(AddSampleComponent);
  }

  openUpdate(styleNumber: string): void {
    this.sampleService.setStyleNumber(styleNumber);
    this.dialog.open(UpdateSampleComponent);
  }

  loadSamples() {
    this.databaseService.getSamples().subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.databaseSamples = data.reverse();
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.databaseSamples.push();
  }

  onDelete(styleNumber: string) {
    this.databaseService.deleteSample(styleNumber).subscribe(
      (res: any) => {
        // YouTube tutorial for reloading component
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate(['./'], {
          relativeTo: this.route,
        });

        // Show a success message
        this._snackBar.open('Sample Successfully Deleted', 'Close', {
          duration: 3000,
        });
      },
      (error) => {
        // Show an error message
        this._snackBar.open(`Unable to delete sample: ${error}`, 'Close', {
          duration: 3000,
        });
      }
    );
  }

  ngOnInit(): void {
    this.loadSamples();
  }
}
