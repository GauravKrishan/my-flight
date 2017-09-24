import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

//Create a Service for search functionality.
export default class SearchService{
    constructor(url){
        this.searchItem = new Subject()
        this.url = url;
    }

    search(term){
        this.searchItem.next(term.value);
    }

    doSearch(term) {
    let promise = fetch(`${this.url}/${term}`)
                  .then(response => response.json());

    return (Observable
           .fromPromise(promise))
  }
    getResults() {
      return this.searchItem.debounceTime(10)
               .distinctUntilChanged()
               .switchMap(term => term
                 ? this.doSearch(term) : Observable.of([]))
               .catch(error => {
                 console.error(error);
                 return Observable.of([]);
            });
   }

}