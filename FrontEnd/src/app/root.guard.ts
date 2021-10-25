import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RootGuard implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const stats = JSON.parse(localStorage.getItem('_u') || '{}')
    const _c: string[] = route.data.role.split(',')

    if (stats) {
      console.log(stats);
      if (stats.admin === _c[0] || stats.admin === _c[1]) {
        return true
      }
      if (stats.admin === 'useser' && _c[0] === 'admin') {
        alert(`ไม่มีสิทธิ์เข้าหน้า Admin`)
        window.location.href = ''
        return false
      }
    }
    alert(`plase loing`)
    window.location.href = '/login'
    return false

  }
}
