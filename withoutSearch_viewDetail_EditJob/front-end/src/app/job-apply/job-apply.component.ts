import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from '../for-cadidate/job.service';
import { LayoutUtilsService, MessageType } from '../layout-utils.service';

@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrl: './job-apply.component.css'
})
export class JobApplyComponent implements OnInit {
  user: any
  p = 1;
  listmyjob: any[] = []
  constructor(private _job_services: JobService, private layoutUtilsService: LayoutUtilsService,
    private changeDetectorRefs: ChangeDetectorRef,) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  MyJob() {
    this._job_services.JobApply().subscribe(res => {

      this.listmyjob = res;
      console.log("listmyjob", this.listmyjob)
      this.changeDetectorRefs.detectChanges();
    })

  }
  Delete(_id: any) {
    const _title = 'Xóa Job'
    const _description = "Bạn có muốn xóa không ?"
    const _waitDesciption = 'Dữ liệu đang được xử lý'
    const _deleteMessage = "Xóa thành công !"
    const _erroMessage = "Thất bại !"
    const dialogRef = this.layoutUtilsService.deleteElement(_title, _description, _waitDesciption);
    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }
      else {
        this._job_services.RemoveJob(_id).subscribe(res => {
          if (res) {
            this.MyJob();
            this.layoutUtilsService.showActionNotification("Successfully submitted", MessageType.Delete, 3000, true, false, 3000, 'top', 1);
          }

        })
      }

    });
  }
  ngOnInit(): void {
    this.MyJob();
  }
}
