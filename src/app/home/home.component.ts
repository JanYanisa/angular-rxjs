import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  private secondObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    // store interval to the defined subscription
    // this.firstObsSubscription = interval(1000).subscribe(count => console.log('interval rxjs function',count))
    const customObservable = Observable.create(observer => {
        let count2 = 0
        setInterval(()=>{
          observer.next(count2)
          if(count2 > 2){
            observer.complete();
            
          }
          if(count2 > 3){
            observer.error(new Error('count2 >= 3'));
            
          }
          console.log('from setInterval',count2)
          count2++
        },1000)
      }
    );
    
    
    this.secondObsSubscription = customObservable
    .pipe(
      filter((data:number)=>{
        return data%2 === 0
      }),
      map(
        (data:number) => {return 'custom interval function'+ data;}
        )
    )
    .subscribe(
      data => {console.log(data)},
      error => {
        console.log(error)
        alert(error.message)
      },
      () => {
        console.log('complete!')
      }
    )
      
  }

  ngOnDestroy(): void {
    // whenever we leave this component, we clear the subscibtion
    // this.firstObsSubscription.unsubscribe()
    this.secondObsSubscription.unsubscribe()
  }
}
