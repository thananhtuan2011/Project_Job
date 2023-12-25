import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { JobService } from '../for-cadidate/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutUtilsService, MessageType } from '../layout-utils.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrl: './job-detail.component.css'
})
export class JobDetailComponent implements OnInit {
  @Input() objectid: any;
  Detailjob: any;
  user: any
  constructor(private _job_services: JobService, private changeDetectorRefs: ChangeDetectorRef,
    private route: ActivatedRoute,
    private layoutUtilsService: LayoutUtilsService,
    private router: Router,

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

    this._job_services.DetailJob(_id).subscribe(res => {
      this.Detailjob = res;
      this.changeDetectorRefs.detectChanges();
    })
  }
  ngOnInit(): void {
    const sb = this.route.params.subscribe((params: any) => {
      this.objectid = params.id;
      this.getDetail(this.objectid)

    })

    // this.getDetail("65883fccad4dc576091ec904");
  }

}
