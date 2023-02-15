import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-save-cancel-buttons',
  templateUrl: './save-cancel-buttons.component.html',
  styleUrls: ['./save-cancel-buttons.component.scss']
})
export class SaveCancelButtonsComponent implements OnInit {
  @Input() route;
  @Input() buttonDisabled;
  @Input() loading = false;
  constructor() { }

  ngOnInit() {
  }

}
