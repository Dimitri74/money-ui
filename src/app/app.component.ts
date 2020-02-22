import { Component, Injectable } from '@angular/core';
import { ToastyConfig } from 'ng2-toasty';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
   title = 'money-ui';

   constructor(private toastyConfig: ToastyConfig) {
    this.toastyConfig.theme = 'bootstrap';


   }



}