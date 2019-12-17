import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { GestureConfig } from '@angular/material';
// Hammer JS
import 'hammerjs';
// NGX Permissions
import { NgxPermissionsModule } from 'ngx-permissions';
import { OverlayModule } from '@angular/cdk/overlay';
// NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// State
import { metaReducers, reducers } from './core/reducers';
// import './vendor';
// import { EGpSharedModule } from 'app/shared/shared.module';
import { CoreModule } from 'app/core/core.module';
import { EGpAppRoutingModule } from './app-routing.module';
// import { EGpHomeModule } from './home/home.module';
// import { EGpEntityModule } from './entities/entity.module';
import { ThemeModule } from './views/theme/theme.module';
// Partials
import { PartialsModule } from './views/partials/partials.module';
// SVG inline
import { InlineSVGModule } from 'ng-inline-svg';
// jhipster-needle-angular-add-module-import JHipster will add new module here
// import { JhiMainComponent } from './layouts/main/main.component';
// import { NavbarComponent } from './layouts/navbar/navbar.component';
// import { FooterComponent } from './layouts/footer/footer.component';
// import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
// import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
// import { ErrorComponent } from './layouts/error/error.component';
// Copmponents
import { AppComponent } from './app.component';

// Layout Services
import {
  DataTableService,
  KtDialogService,
  LayoutConfigService,
  LayoutRefService,
  MenuAsideService,
  MenuConfigService,
  MenuHorizontalService,
  PageConfigService,
  SplashScreenService,
  SubheaderService
} from './core/_base/layout';
import { AuthModule } from './views/pages/auth/auth.module';
import { AuthService } from './core/auth';
// CRUD
import { HttpUtilsService, LayoutUtilsService, TypesUtilsService } from './core/_base/crud';
// Config
import { LayoutConfig } from './core/_config/layout.config';
import { TestComponent } from './test/test.component';

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    EGpAppRoutingModule,
    NgxPermissionsModule.forRoot(),
    PartialsModule,
    CoreModule,
    OverlayModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    StoreDevtoolsModule.instrument(),
    AuthModule.forRoot(),
    TranslateModule.forRoot(),
    InlineSVGModule.forRoot(),
    ThemeModule
    // jhipster-needle-angular-add-module JHipster will add new module here
  ],
  providers: [
    AuthService,
    LayoutConfigService,
    LayoutRefService,
    MenuConfigService,
    PageConfigService,
    KtDialogService,
    DataTableService,
    SplashScreenService,
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: GestureConfig
    },
    {
      // layout config initializer
      provide: APP_INITIALIZER,
      useFactory: initializeLayoutConfig,
      deps: [LayoutConfigService],
      multi: true
    },
    // template services
    SubheaderService,
    MenuHorizontalService,
    MenuAsideService,
    HttpUtilsService,
    TypesUtilsService,
    LayoutUtilsService
  ],
  // declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, ActiveMenuDirective, FooterComponent],
  declarations: [AppComponent, TestComponent],
  bootstrap: [AppComponent]
})
export class EGpAppModule {}
