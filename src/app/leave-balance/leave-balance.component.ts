import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrl: './leave-balance.component.css'
})
export class LeaveBalanceComponent implements OnInit{
    constructor(private http: HttpClient) { }
    leaveBalance:any;

  ngOnInit(): void {
      this.getBalance();
  }


  getBalance(){
    this.http.get<any>('http://localhost:8080/api/leave-balances').subscribe({
      next: (response) => {
        this.leaveBalance = response;
        this.getBalance();
      },
      error: (err) =>{
        console.error(err);
      }
    });
  }
}
