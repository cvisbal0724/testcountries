import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import {PagerService} from '../../services/pager.service';

@Component({
  selector: 'app-countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.scss']
})

export class CountriesListComponent implements OnInit {

  @ViewChild('auto') auto;
  @ViewChild('searchCtr') searchCtr: ElementRef;
  // icon button search
  faSearch = faSearch;
  public criteria = '';
  public search = '';
  public languages: any[] = [];
  public continents: any[] = [];
  public countries: any[] = [];
  public list: any[] = [];
  public country: any = {};
  // zoom by default google maop
  public zoom: Number = 5;
  // pager object
  pager: any = {};
   // paged items
   pagedItems: any[];
   // page by default
   public page: number = 1;
   public selected = [];
   public pageSize: number = 12;

  constructor(private http: HttpClient,
              private modalService: NgbModal,
              private ngxService: NgxUiLoaderService,
              private pagerService: PagerService) { }

  ngOnInit() {
    this.getJSON('./assets/languajes.json').subscribe(data => {
      this.languages = data;
    });
    this.getJSON('./assets/continents.json').subscribe(data => {
      this.continents = data;
    });
    this.getJSON('./assets/countries.json').subscribe(data => {
      this.countries = data;
    });
    this.getAllCountries();
  }

  getAllCountries() {
    this.ngxService.start();
    this.http.get<any>(`https://restcountries.eu/rest/v2/all/` +
                        `?fields=flag;name;capital;languages;region;currencies;alpha2Code`)
    .subscribe((data) => {
      this.list = data;
      this.setPage();
      this.ngxService.stop();
    }, (error) => {
      this.ngxService.stop();
    });

  }

  // Method used to search countries by criteria
  filterCountries() {
    this.ngxService.start();
    this.http.get<any>(`https://restcountries.eu/rest/v2/${this.criteria}/${this.search}/` +
                        `?fields=flag;name;capital;languages;region;currencies;alpha2Code`)
    .subscribe((data) => {
      this.list = data;
      this.setPage();
      this.ngxService.stop();
    }, (error) => {
      this.ngxService.stop();
    });

  }

  // Method used to paginate the list
  setPage() {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.list.length, this.page, this.pageSize);
    // get current page of items
    this.pagedItems = this.list.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  // Method used to concatenate json property
  joinArray(list, field) {
    return list.map((x) => x[field]).join(', ');
  }

  // Method used to get one country
  getCountry(content, item) {
    this.ngxService.start();
    this.http.get<any>(`https://restcountries.eu/rest/v2/alpha/${item.alpha2Code}/?` +
                      `fields=topLevelDomain;alpha3Code;name;subregion;population;borders;languages;latlng;flag;region;capital`)
    .subscribe((data) => {
      this.country = data;
      this.modalService.open(content, {size: 'lg'});
      this.ngxService.stop();
    }, (error) => {
      this.ngxService.stop();
    });

  }

  // Method used to seach with the enter key
  handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.filterCountries();
    }
  }

  // Event when a country is chosen
  selectEvent(item) {
    this.search = item.id;
    this.filterCountries();
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }

  onFocused(e){
    e.stopPropagation();
    this.auto.focus();
  }

  // Event when change radiobutton value
  changeValue(evt) {
    const target = evt.target;
    this.search = '';
    if (target.checked && (this.criteria === 'region' || this.criteria === 'lang' || this.criteria === 'name')) {
      if (this.auto) {
        this.auto.focus();
        this.search = '';
      }
    } else if (target.checked) {
      this.searchCtr.nativeElement.focus();
    }
  }

  public getJSON(file): Observable<any> {
    return this.http.get(file);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
