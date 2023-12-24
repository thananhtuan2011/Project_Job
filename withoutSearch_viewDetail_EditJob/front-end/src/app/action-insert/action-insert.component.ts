import { Component, OnInit } from '@angular/core';
import { ActionService } from './action.service';

@Component({
  selector: 'app-action-insert',
  templateUrl: './action-insert.component.html',
  styleUrl: './action-insert.component.css'
})
export class ActionInsertComponent implements OnInit {
  name!: string;
  constructor(private actionService: ActionService) {

  }

  Insert() {
    let item = {
      name: this.name
    }

    this.actionService.addskill(item).subscribe(res => {
      this.name = "";
    })

  }

  ngOnInit(): void {

  }

}
