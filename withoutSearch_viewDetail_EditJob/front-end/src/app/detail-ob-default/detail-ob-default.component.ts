import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { JobService } from '../for-cadidate/job.service';
import { LayoutUtilsService, MessageType } from '../layout-utils.service';

@Component({
  selector: 'app-detail-ob-default',
  templateUrl: './detail-ob-default.component.html',
  styleUrl: './detail-ob-default.component.css'
})
export class DetailObDefaultComponent implements OnInit {
  @Input() objectid: any;
  Detailjob: any;
  user: any
  constructor(private _job_services: JobService, private changeDetectorRefs: ChangeDetectorRef,
    private layoutUtilsService: LayoutUtilsService,
  ) {
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  Apply() {
    let item = {
      InforJob: this.Detailjob,
      UserApply: this.user.__id

    }
    this._job_services.Apply(item).subscribe(res => {
      alert(" Apply success");
    })
  }
  getDetail(_id: any) {

    this._job_services.DetailJobDefault().subscribe(res => {
      this.Detailjob = res[0];
      this.changeDetectorRefs.detectChanges();
    })
  }
  ngOnInit(): void {
    this.getDetail(this.objectid)
  }
}
