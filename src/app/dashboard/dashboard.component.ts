import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  leaveData: any[] = [];
  totalLeaveDay = 0;
  pendingRequestsCount =0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getRequests();

  }

  getRequests() {
  this.http.get<any[]>('http://localhost:8080/api/leave-requests')
    .subscribe({
      next: (response) => {
        this.leaveData = response.map(item => ({
          ...item,
          total_date: this.calculateDate(item.start_date, item.end_date)
        }));
        this.totalLeaveDay = this.leaveData.filter(item => item.status !== 'รออนุมัติ' && item.status !== 'ไม่อนุมัติ').reduce((sum, item) => sum + item.total_date, 0);
        this.getRequests();
      },
      error: (err) => {
        console.error(err);
      }
    });
}


  calculateDate(start_dateData: string, end_dateData: string): number {
    const start_date = new Date(start_dateData);
    const end_date = new Date(end_dateData)
    const diffTime = end_date.getTime() - start_date.getTime();
    const diffTimeCal = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffTimeCal > 0 ? diffTimeCal : 0;
  }
  formatDateRange(startDateStr: string, endDateStr: string): string {
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
      "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];

    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    const startYear = startDate.getFullYear() + 543;
    const endYear = endDate.getFullYear() + 543;

    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    const startMonth = months[startDate.getMonth()];
    const endMonth = months[endDate.getMonth()];

    if (startMonth === endMonth && startYear === endYear) {
      return `${startDay}-${endDay} ${startMonth} ${startYear}`;
    }

    if (startMonth === endMonth) {
      return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
    }

    return `${startDay} ${startMonth} ${startYear} - ${endDay} ${endMonth} ${endYear}`;
  }



}
