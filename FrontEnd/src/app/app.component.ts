import { ChangeDetectorRef, Component, OnDestroy, Output } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {

  iftolog = true;
  mobileQueryMax: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQueryMax = window.matchMedia('(max-width: 800px)');
    this.mobileQueryMax.addListener(this._mobileQueryListener);

  }
  ngOnDestroy(): void {
    this.mobileQueryMax.removeListener(this._mobileQueryListener);
  }
}
