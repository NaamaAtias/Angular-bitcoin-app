import { Injectable } from '@angular/core';
import {
  Observable,
  BehaviorSubject,
  from,
} from 'rxjs';
import { localStorageService } from './storage.service';
import { of, map } from 'rxjs';
import { Point } from '../models/point.model';
const ENTITY = 'bitcoin-rate';

@Injectable({
  providedIn: 'root',
})
export class BitcoinService {
  private _bitcoinRate$ = new BehaviorSubject<number>(0);
  public bitcoinRate$ = this._bitcoinRate$ as Observable<number>;

  private _currentBitcoins$ = new BehaviorSubject<number>(0);
  public currentBitcoins$ = this._currentBitcoins$ as Observable<number>;

  TRADE_VOLUME_KEY = 'tradeVolume';

  constructor() {
    const bitcoinRate = JSON.parse(localStorage.getItem(ENTITY) || 'null');
    if (!bitcoinRate || bitcoinRate.length === 0) {
      localStorage.setItem(ENTITY, JSON.stringify(this._bitcoinRate$.value));
    }
  }

  public getRate(coins: number): void {
    this._fromPromise$.subscribe((bitcoinRate) => {
      console.log('bitcoinRate:', bitcoinRate);
      this._bitcoinRate$.next(bitcoinRate);
      this._currentBitcoins$.next(bitcoinRate * coins);
      console.log('this._currentBitcoins$:', this._currentBitcoins$.value);
    });
  }

  // create observable from a promise:
  private _fromPromise$ = from(
    fetch('https://blockchain.info/tobtc?currency=USD&value=1').then((res) =>
      res.json()
    )
  );

  getMarketPrice(): Observable<Point[]> {
    const data = localStorageService.load(this.TRADE_VOLUME_KEY);
    console.log('data service', data);

    if (data) return of(data);

    const fromPromise = from(
      fetch(
        'https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true'
      ).then((res) => res.json())
    );
    //this.http.get<{ values: Point[] }>(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
    return fromPromise.pipe(
      map((res) => {
        //prepare the data in a way that the chart can render
        const vals = res.values;
        console.log('vals from promise', vals);
        localStorageService.store(this.TRADE_VOLUME_KEY, vals);
        return vals;
      })
    );
  }
}
