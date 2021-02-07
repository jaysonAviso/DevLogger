import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Log } from '../components/model/log';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null})
  selectedLog = this.logSource.asObservable();

  private stateSourse = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSourse.asObservable();

  constructor() {
    // this.logs = [
    //   {
    //     id: "1",
    //     text: "Genarated Commponents",
    //     date: new Date('02/07/2021 09:45:00')
    //   },
    //   {
    //     id: "2",
    //     text: "model of logs component",
    //     date: new Date('02/06/2021 13:25:00')
    //   },
    //   {
    //     id: "3",
    //     text: "added logs services",
    //     date: new Date('02/07/2021 15:13:00')
    //   }
    // ]
    this.logs = [];
  }

   getLogs(): Observable<Log[]>{
     if(localStorage.getItem('logs') === null){
       this.logs = [];
     } else {
       this.logs = JSON.parse(localStorage.getItem('logs'));
     }
     return of(this.logs.sort((a, b) => b.date = a.date ));
   }
   
   setFormLog(log: Log){
      this.logSource.next(log);
   }

   addLog(log: Log){
    this.logs.unshift(log);

    //add to local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  
  updateLog(log: Log){
    this.logs.forEach((current, index) => {
      if(log.id === current.id){
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));

    //update to local storage
  }
  deleteLog(log: Log){
    this.logs.forEach((current, index) => {
      if(log.id === current.id){
        this.logs.splice(index, 1);
      }
    });
    // delete to local Storage
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   clearState() {
     this.stateSourse.next(true);
   }

}
