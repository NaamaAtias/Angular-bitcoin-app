import { Component , inject, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { BitcoinService } from '../../services/bitcoin.service';
import { User } from '../../models/user.model';
import { delay , Observable, tap, take} from 'rxjs';
import { Subscription } from 'rxjs';


@Component({
  selector: 'home-page',
  standalone: false,
  
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  private UserService = inject(UserService)
  user:User = this.UserService.user

  private BitcoinService = inject(BitcoinService)
  bitcoinRate$ = this.BitcoinService.bitcoinRate$

  currentUserRate$=this.BitcoinService.currentBitcoins$

  ans=''

  private subscription!: Subscription

  ngOnInit() : void{
    this.BitcoinService.getRate(this.user.coins)

  }
  
}
