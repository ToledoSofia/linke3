import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-cards',
  templateUrl: './user-cards.component.html',
  styleUrls: ['./user-cards.component.css']
})
export class UserCardsComponent implements OnInit {
  @Input() type: 'musicos' | 'grupos' = 'musicos'; // Default to 'musicos'
  items: any[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.fetchData();
  }
  navigateToProfile(userId: number): void {
    this.router.navigate(['/perfil', userId]); // Redirige a la URL con el ID
  }
  

  fetchData(): void { //agarrar todos los musicos o grupos para despues mostrarlos en el buscador
    this.apiService.getData(this.type).subscribe((data) => {
      this.items = data;
    });
  }
}
