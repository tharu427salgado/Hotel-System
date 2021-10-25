import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Booking } from '../models/booking.model';
import { checkout } from '../models/Checkout.model';
import { login } from '../models/login.model';
import { Pay } from '../models/pay.model';
import { register } from '../models/register.model';
import { Report } from '../models/Reports.model';
import { BookingRes, CheckoutRes, PayRes, ReportRes, Response, UserRes } from '../models/Respones.model';

@Injectable({
  providedIn: 'root',
})
export class NetworkUserService {
  constructor(private httpClient: HttpClient) { }



  postRegister(Register: register): Observable<Response> {
    return this.httpClient.post<Response>(`register`, Register,
      {
        withCredentials: true
      })
  }

  postlogin(Login: login): Observable<Response> {
    return this.httpClient.post<Response>(`login`, Login,
      {
        withCredentials: true
      })
  }

  postbooking(booking: Booking): Observable<Response> {
    return this.httpClient.post<Response>(`booking`, booking,
      {
        withCredentials: true
      })
  }

  postReport(report: Report): Observable<Response> {
    return this.httpClient.post<Response>(`report`, report,
      {
        withCredentials: true
      })
  }

  postCheckout(Checkuot: checkout): Observable<Response> {
    return this.httpClient.post<Response>(`checkout`, Checkuot,
      {
        withCredentials: true
      })
  }

  postpay(pay: Pay): Observable<Response> {
    return this.httpClient.post<Response>(`pay`, this.makeFormData(pay),
      {
        withCredentials: true
      })
  }

  makeFormData(pay: Pay): FormData {
    const formData = new FormData()
    formData.append('roomNum', `${pay.roomNum}`)
    formData.append('name', pay.name)
    formData.append('phoneNum', `${pay.phoneNum}`)
    formData.append('time', pay.time)
    formData.append('date', pay.date)
    formData.append('amount', pay.amount)
    formData.append('bank', pay.bank)
    formData.append('image', pay.image)
    console.log(formData.get('image'));

    return formData
  }

  getBooking(): Observable<BookingRes[]> {
    return this.httpClient.get<BookingRes[]>(`booking/admin`,
      {
        withCredentials: true
      })
  }

  getCheckout(): Observable<CheckoutRes[]> {
    return this.httpClient.get<CheckoutRes[]>(`checkout/admin`,
      {
        withCredentials: true
      })
  }

  getReport(): Observable<ReportRes[]> {
    return this.httpClient.get<ReportRes[]>(`report/admin`,
      {
        withCredentials: true
      })
  }

  getReports(id: number): Observable<ReportRes[]> {
    return this.httpClient.get<ReportRes[]>(`report/admin/${id}`,
      {
        withCredentials: true
      })
  }

  getPay(): Observable<PayRes[]> {
    return this.httpClient.get<PayRes[]>(`pay/admin`,
      {
        withCredentials: true
      })
  }

  getPays(id: number): Observable<PayRes[]> {
    return this.httpClient.get<PayRes[]>(`pay/admin/${id}`,
      {
        withCredentials: true
      })
  }

  getPayImage(image: string): string {
    if (image) {
      return `${environment.baseURL}images/${image}`
    }
    return 'assets/room.jpeg'
  }


  getUseser(): Observable<UserRes[]> {
    return this.httpClient.get<UserRes[]>(`register/admin`,
      {
        withCredentials: true
      })
  }

  putbookingcheck(id: number[]): Observable<Response> {
    console.log(this.makeIDcheck(id));
    return this.httpClient.put<Response>(`booking/admin/check`, this.makeIDcheck(id),
      {
        withCredentials: true
      })
  }

  putcheckoutcheck(id: number[]): Observable<Response> {
    return this.httpClient.put<Response>(`checkout/admin/check`, this.makeIDcheck(id),
      {
        withCredentials: true
      })
  }

  putreportcheck(id: number[]): Observable<Response> {
    return this.httpClient.put<Response>(`report/admin/check/`, this.makeIDcheck(id),
      {
        withCredentials: true
      })
  }

  putPaychek(id: number[]): Observable<Response> {
    return this.httpClient.put<Response>(`pay/admin/check/`, this.makeIDcheck(id),
      {
        withCredentials: true
      })
  }

  deleteUser(id: number): Observable<Response> {
    return this.httpClient.delete<Response>(`register/admin/delete/${id}`,
      {
        withCredentials: true
      })
  }

  makeIDcheck(ID: number[]) {
    let Idform = { "id": ID.toString() }
    return Idform
  }

}
