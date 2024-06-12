import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  standalone:true,
  selector: 'app-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  imports:[RouterOutlet]
})
export class UserLayoutComponent implements OnInit {

  ngOnInit() {
  }

}
