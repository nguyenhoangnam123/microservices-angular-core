import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'users',
        loadChildren: () => import('./UserManagement/users/users.module').then(m => m.UserManagementUsersModule)
      },
      {
        path: 'roles',
        loadChildren: () => import('./UserManagement/roles/roles.module').then(m => m.UserManagementRolesModule)
      },
      {
        path: 'user-roles',
        loadChildren: () => import('./UserManagement/user-roles/user-roles.module').then(m => m.UserManagementUserRolesModule)
      },
      {
        path: 'menu',
        loadChildren: () => import('./UserManagement/menu/menu.module').then(m => m.UserManagementMenuModule)
      },
      {
        path: 'operation',
        loadChildren: () => import('./UserManagement/operation/operation.module').then(m => m.UserManagementOperationModule)
      },
      {
        path: 'permission',
        loadChildren: () => import('./UserManagement/permission/permission.module').then(m => m.UserManagementPermissionModule)
      },
      {
        path: 'roles-permiss',
        loadChildren: () => import('./UserManagement/roles-permiss/roles-permiss.module').then(m => m.UserManagementRolesPermissModule)
      },
      {
        path: 'zone',
        loadChildren: () => import('./UserManagement/zone/zone.module').then(m => m.UserManagementZoneModule)
      },
      {
        path: 'menu-zone',
        loadChildren: () => import('./UserManagement/menu-zone/menu-zone.module').then(m => m.UserManagementMenuZoneModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class EGpEntityModule {}
