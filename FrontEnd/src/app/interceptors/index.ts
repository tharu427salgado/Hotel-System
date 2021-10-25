import { HTTP_INTERCEPTORS } from "@angular/common/http"
import { LogInterceptor } from "./log.interceptor"
import { RestInterceptor } from "./rest.interceptor"

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: RestInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LogInterceptor, multi: true },
]