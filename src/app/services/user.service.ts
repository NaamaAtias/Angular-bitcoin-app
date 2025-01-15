import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
const ENTITY = 'user'



@Injectable({
    providedIn: 'root'
})
export class UserService {

    private _user = this._getUser()
    public user = this._user

    constructor() {
        // Handling Demo Data, fetching from storage || saving to storage 
        const user = JSON.parse(localStorage.getItem(ENTITY) || 'null')
        if (!user || user.length === 0) {
            localStorage.setItem(ENTITY, JSON.stringify(this._getUser()))
        }
    }

    private _getUser() {
        const user:User = 
            {
                "name": "Naama Atias",
                "coins": 100,
                "moves": []
            }
        ;
        return user
    }

 
}
