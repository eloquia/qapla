import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-plus-circle',
  template: `<span class="hover:cursor-pointer">
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor">
      <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  </span>`,
})
export class PlusCircleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
