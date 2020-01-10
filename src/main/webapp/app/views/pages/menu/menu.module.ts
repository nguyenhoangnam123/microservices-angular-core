// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PartialsModule } from 'app/views/partials/partials.module';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { ActionNotificationComponent } from 'app/views/partials/content/crud';
import { RoleEditDialogComponent } from '../user-management/roles/role-edit/role-edit.dialog.component';
import { MenuComponent } from './menu.component';
import {
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatInputModule,
  MatTableModule,
  MatAutocompleteModule,
  MatRadioModule,
  MatIconModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatDatepickerModule,
  MatCardModule,
  MatPaginatorModule,
  MatSortModule,
  MatCheckboxModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatExpansionModule,
  MatTabsModule,
  MatTooltipModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    PartialsModule,
    MatButtonModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatIconModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatCardModule,
    MatPaginatorModule,
    MatSortModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatTabsModule,
    MatTooltipModule,
    MatDialogModule
  ],
  providers: [LayoutUtilsService],
  entryComponents: [ActionNotificationComponent, RoleEditDialogComponent],
  declarations: [MenuComponent]
})
export class MenuModule {}
