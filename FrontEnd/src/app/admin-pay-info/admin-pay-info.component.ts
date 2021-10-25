import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NetworkUserService } from '../services/network-user.service';

@Component({
  selector: 'app-admin-pay-info',
  templateUrl: './admin-pay-info.component.html',
  styleUrls: ['./admin-pay-info.component.css']
})
export class AdminPayInfoComponent implements OnInit {

  imagePreview: string | ArrayBuffer | null;
  file: File;

  @ViewChild('payForm', { static: true }) payForm: NgForm

  constructor(private activatedRoute: ActivatedRoute,
    private networkUserService: NetworkUserService,
    private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      params => {
        this.feedData(params.id)
      }
    )
  }

  feedData(id: number) {
    this.networkUserService.getPays(id).subscribe(
      data => {
        var { id, roomnum, name, phonenum, time, date, amount, bank, image } = { ...data[0] }
        this.imagePreview = this.networkUserService.getPayImage(image)
        this.payForm.setValue({ id, roomnum, name, phonenum, time, amount, bank, image, date })
      },
      error => {

      },
      () => {

      }
    )
  }

  onPreviewImage(event: any) {
    const metaImage = event.target.files[0];
    if (metaImage) {
      this.file = metaImage;

      const reader = new FileReader();
      reader.readAsDataURL(metaImage)
      reader.onload = () => {
        this.imagePreview = reader.result;
      }
    }
  }

}
