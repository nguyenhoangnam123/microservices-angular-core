import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMenuZone } from 'app/shared/model/UserManagement/menu-zone.model';

@Component({
  selector: 'jhi-menu-zone-detail',
  templateUrl: './menu-zone-detail.component.html'
})
export class MenuZoneDetailComponent implements OnInit {
  menuZone: IMenuZone;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ menuZone }) => {
      this.menuZone = menuZone;
    });
  }

  previousState() {
    window.history.back();
  }
}
