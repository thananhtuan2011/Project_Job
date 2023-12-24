import { ActionInsertComponent } from './../action-insert/action-insert.component';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Observable, map, startWith } from 'rxjs';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { SkillService } from '../services/skill.service';
import { SaveJobService } from '../services/save-job.service';
@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css']
})
export class PostJobComponent implements OnInit {
  selectedtype: any
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
  disabled = false;
  max = 10000;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  valuemax = 0;
  radiovalue!: any;
  name!: string;
  @ViewChild('container') container: ElementRef | undefined;
  description!: string;
  requirement!: string;
  benefit!: string;

  namejob!: string;
  namecty!: string
  username!: string;
  password!: string;
  pass!: string;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits!: Observable<any>;
  fruits: string[] = [];
  allFruits: string[] = [];
  user_tam: any[] = []
  visible = true;
  addOnBlur = true;
  user: any
  @ViewChild('auto', { static: false }) matAutocomplete!: MatAutocomplete;

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;

  announcer = inject(LiveAnnouncer);
  constructor(private job_servives: SaveJobService, private skill_serices: SkillService, private changeDetectorRefs: ChangeDetectorRef,) {
    // this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    // );
    this.user = JSON.parse(localStorage.getItem("user")!);
  }
  toggleActiveState() {
    if (this.container) {
      this.container.nativeElement.classList.add('active');
    }
  }

  toggleInactiveState() {
    if (this.container) {
      this.container.nativeElement.classList.remove('active');
    }
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }
  private _filterStates(value: string): any[] {
    // debugger
    //	const filterValue = value.toLowerCase();
    const filterValue = this._normalizeValue(value);
    return this.user_tam.filter(state => this._normalizeValue(state.name).includes(filterValue));
  }
  GetAllSkill() {
    this.skill_serices.getAllSkills().subscribe(res => {
      this.user_tam = res;
      this.changeDetectorRefs.detectChanges();
      this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
        startWith(null),
        map((fruit: string | null) => (fruit ? this._filterStates(fruit) : res.slice())),
      );
    })
  }
  ngOnInit() {
    this.GetAllSkill();
    this.toggleActiveState();
  }
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.fruitCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);


      this.announcer.announce(`Removed ${fruit}`);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    console.log("event.option.viewValue", event)
    let index = this.fruits.findIndex(x => x == event.option.viewValue);
    if (index >= 0) {
      alert("Đã tồn tại")
    }
    else {
      this.fruits.push(event.option.viewValue);
      this.fruitInput.nativeElement.value = '';
      this.fruitCtrl.setValue(null);
      console.log(" this.fruits", this.fruits)
    }

  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


  Created() {


    let date = new Date()
    let item = {
      namejob: this.namejob,
      namecty: this.namecty,
      created: date,
      minsalary: this.value,
      maxsalary: this.valuemax,
      createdBy: this.user._id,
      location: this.selectedtype,
      job_description: this.description,
      jobs_requirement: this.requirement,
      benefit: this.benefit,
      listSkill: this.fruits


    }
    this.job_servives.createJobApplication(item).subscribe(res => {

      if (res.status == 1) {
        alert("Thành công")
      }
    })
  }

}
