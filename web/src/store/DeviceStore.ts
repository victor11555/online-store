import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  _types: { id: number; name: string; }[];
  _brands: { id: number; name: string; }[];
  _devices: { id: number; name: string; price: number; rating: number; img: string; }[];
  _selectedType: { id: number; name: string; };
  _selectedBrand: { id: number; name: string; };
  _page: number;
  _totalCount: number;
  _limit: number;

  constructor() {
    this._types = []
    this._brands = []
    this._devices = []
    this._selectedType = {} as { id: number; name: string; };
    this._selectedBrand = {} as { id: number; name: string; };
    this._page = 1
    this._totalCount = 0
    this._limit = 3
    makeAutoObservable(this)
  }

  setTypes(types: []) {
    this._types = types
  }

  setBrands(brands: []) {
    this._brands = brands
  }

  setDevices(devices: []) {
    this._devices = devices
  }

  setSelectedType(type: { id: number; name: string; }) {
    this.setPage(1)
    this._selectedType = type
  }

  setSelectedBrand(brand: { id: number; name: string; }) {
    this.setPage(1)
    this._selectedBrand = brand
  }

  setPage(page: number) {
    this._page = page
  }

  setTotalCount(totalCount: number) {
    this._totalCount = totalCount
  }

  setLimit(limit: number) {
    this._limit = limit
  }

  get types() {
    return this._types
  }

  get brands() {
    return this._brands
  }

  get devices() {
    return this._devices
  }

  get selectedType() {
    return this._selectedType
  }

  get selectedBrand() {
    return this._selectedBrand
  }

  get page() {
    return this._page
  }

  get totalCount() {
    return this._totalCount
  }

  get limit() {
    return this._limit
  }
}