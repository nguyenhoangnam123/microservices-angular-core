// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PartialsModule } from 'app/views/partials/partials.module';
import { LayoutUtilsService } from 'app/core/_base/crud';
import { ActionNotificationComponent, DeleteEntityDialogComponent } from 'app/views/partials/content/crud';
// NGRX
import { StoreModule } from '@ngrx/store';

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
import { MenuEditDialogComponent } from './menu-edit/menu-edit.dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { usersReducer, UserEffects } from 'app/core/auth';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
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
  entryComponents: [ActionNotificationComponent, MenuEditDialogComponent, DeleteEntityDialogComponent],
  declarations: [MenuComponent, MenuEditDialogComponent]
})
export class MenuModule {}
