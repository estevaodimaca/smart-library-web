import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredBooks: any[] = [];
  
  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.featuredBooks = books;
    });
  }
}
