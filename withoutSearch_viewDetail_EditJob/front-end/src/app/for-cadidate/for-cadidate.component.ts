import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { JobService } from './job.service';

@Component({
  selector: 'app-for-cadidate',

  templateUrl: './for-cadidate.component.html',
  styleUrl: './for-cadidate.component.css'
})
export class ForCadidateComponent implements OnInit {
  p = 1;
  searchtext!: string;
  selected: any;
  listLocation: any[] = [
    {
      _id: 1,
      type_name: "Đà Nẵng"
    },
    {
      _id: 2,
      type_name: "Hồ Chí Minh"
    },
    {
      _id: 3,
      type_name: "Cần Thơ"
    },
    {
      _id: 4,
      type_name: "Bình Dương"
    },
    {
      _id: 5,
      type_name: "Hà Nội"
    },

  ]
  listrandom: any[] = [];
  listAllJob: any[] = [];
  constructor(private _job_services: JobService, private changeDetectorRefs: ChangeDetectorRef,) {

  }

  getRandomJob() {
    this._job_services.RandomJob().subscribe(res => {
      this.listrandom = res;
      this.changeDetectorRefs.detectChanges();

    })
  }
  saverange(value: any) {
    this.search(value)

  }

  search(value: any) {

    if (value != "") {
      const filter = { namejob: value };



      this._job_services.AllJob({ filter }).subscribe(res => {
        this.listAllJob = res;
        this.changeDetectorRefs.detectChanges();

      })
    }
    else {


      this.GetAllJob();
    }

  }
  GetAllJob() {
    this._job_services.AllJob(null).subscribe(res => {
      console.log("resresres", res)
      this.listAllJob = res;
      console.log("vvvvv", this.listAllJob)
      this.changeDetectorRefs.detectChanges();

    })
  }
  Eventload() {
    this._job_services.location$.subscribe(res => {
      this.GetAllJobLocation(res)
    })
  }

  ngOnInit(): void {
    this.GetAllJob();
    this.getRandomJob();
    this.Eventload();
  }

  GetAllJobLocation(value: any) {
    const filter = { location: value };
    // let filter = { location: value };

    this._job_services.AllJob({ filter }).subscribe(res => {
      this.listAllJob = res;

      this.changeDetectorRefs.detectChanges();

    })
  }

  onDepartmentSelection() {

    const filter = { idsuppliers: this.selected };
    // this._customer_services.patchStateAllCustomer({ filter }, this.apiacount);
  }

}
