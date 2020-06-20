import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {SearchService} from '../services/search.service';
import {SimpleSearchResponse} from '../models';
import { Router } from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  myControl = new FormControl();
  options: SimpleSearchResponse[] = [{id: '1', name: 'Java EE', number: '0860654654', credit: 5}];
  toSearch: string;
  constructor(
    private searchService: SearchService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
  }
  ngOnInit(): void {
  }

  handleSelected(option: SimpleSearchResponse) {
    console.log(option);
    this.router.navigateByUrl('/courses/' + option.id, { replaceUrl: false }).then(() => {
      this.snackBar.open('查找中', undefined, { duration: 2000 });
    });
  }
  updateOptions($event) {
    this.toSearch = $event.target.value;
    this.searchService.simpleSearch(this.toSearch).subscribe(
      (data) => {
        console.log(data);
        this.options = data;
      },
      (err: HttpErrorResponse) => {
      }
    );
  }

  displayFn(value: SimpleSearchResponse | null) {
    if (value === null) {
      return '';
    }
    return value.number + ' ' + value.name + '123';
  }
}
