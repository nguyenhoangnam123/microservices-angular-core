import { AbstractControl } from '@angular/forms';
import { MenuItem } from 'app/core/_base/layout';

export function ValidParentMenuValidator(menuList: MenuItem[]) {
  return function(control: AbstractControl) {
    const parentMenu = control.get('parent').value;
    const menuListId = menuList.map(option => option.id);
    if (parentMenu) {
      if (!menuListId.includes(parentMenu.id)) {
        control.get('parent').setErrors({ parentMenu: true });
      } else {
        control.get('parent').setErrors(null);
      }
    }
  };
}
