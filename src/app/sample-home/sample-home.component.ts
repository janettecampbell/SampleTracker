import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../service/database/database.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AddSampleComponent } from '../add-sample/add-sample.component';

@Component({
  selector: 'app-sample-home',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, AddSampleComponent],
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
    "actions",
  ];

  constructor(private databaseService: DatabaseService, public dialog: MatDialog,) {}

  openDialog(): void {
    this.dialog.open(AddSampleComponent);
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
    console.log(this.databaseService.getSamples());
    this.databaseSamples.push();
  }

  ngOnInit(): void {
    this.loadSamples();
  }
}
