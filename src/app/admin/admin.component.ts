import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  constructor(private http: HttpClient) { }
  leaveData: any[] = [];
  ngOnInit(): void {
    this.getRequests();
  }
  getRequests() {
    this.http.get<any[]>('http://localhost:8080/api/leave-requests')
      .subscribe({
        next: (response) => {
          this.leaveData = response.filter(item => item.status !== 'อนุมัติแล้ว' && item.status !== 'ไม่อนุมัติ').map(item =>{
            return {
              ...item
            }
          });
        },
        error: (err) => {
          console.error(err);
        }
      });
  }
  calculateDate(start_date: string, end_date: string): number {
    const start = new Date(start_date);
    const end = new Date(end_date);
    const diff = Math.floor((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return diff > 0 ? diff : 0;
  }

  updateRequest(start_date:string, end_date:string, status:string, leave_type_id:number) {
  const updatedStatus = { 
    user_id: 14,
    leave_type_id,
    status,
    start_date,
    end_date
  };

  this.http.put<any>('http://localhost:8080/api/leave-request/14', updatedStatus)
    .subscribe({
      next: (res) => {
        alert('อัปเดตสถานะสำเร็จ');
        this.getRequests();
      },
      error: (err) => {
        console.error('เกิดข้อผิดพลาดในการอัปเดต', err);
      }
    });
}
  getLeaveTypeName(leavTypeId: number): string {
  switch (leavTypeId) {
    case 1: return 'ลาพักร้อน';
    case 2: return 'ลาป่วย';
    case 3: return 'ลากิจ';
    default: return '-';
  }
}
}

