import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  @Input() type: 'musicos' | 'grupos' = 'musicos'; // Default to 'musicos'
  items: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void { //agarrar todos los musicos o grupos para despues mostrarlos en el buscador
    this.apiService.getData(this.type).subscribe((data) => {
      this.items = data;
    });
  }
}
