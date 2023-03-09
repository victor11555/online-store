import { makeAutoObservable } from "mobx";

export default class UserStore {
  _isAuth: boolean;
  _user: {} | boolean;

  constructor() {
    this._isAuth = false
    this._user = {}
    makeAutoObservable(this)
  }

  setIsAuth(bool: boolean) {
    this._isAuth = bool
  }

  setUser(user: object | boolean) {
    this._user = user
  }

  get isAuth() {
    return this._isAuth
  }

  get user() {
    return this._user
  }
}