import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.css'] 
})
export class LeaveRequestFormComponent {
  constructor(private http: HttpClient) {}

  leaveData = {
      user_id: 14,
      leave_type_id: 0,
      start_date: '',
      end_date: '',
      reason: '',
      status:'รออนุมัติ',
    };
  leaveRequest() {
    this.http.post<any>('http://localhost:8080/api/leave-requests', this.leaveData)
      .subscribe({
        next: 
          response => {
            alert('บันทึกคำขอลาสำเร็จ');
        },
        error: err => console.error('เกิดข้อผิดพลาด', err)
      });

  }
}
