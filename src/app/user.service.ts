import {Injectable, EventEmitter} from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({providedIn: 'root'}) //with this, there's no need to be added in the providers: [], in app.Module
export class UserService {
    // activatedEmitter = new EventEmitter<boolean>()
    activatedEmitter = new Subject<boolean>()
}