import { Component, OnInit } from '@angular/core';
import { UUID } from 'uuid-generator-ts'
import { LogService } from '../../services/log.service';

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  uuid = new UUID();
  isNew: boolean = true;
  isValue: string = 'Add log';
  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.logService.selectedLog.subscribe(log => {
      if(log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
        this.isValue = 'Update log'
      }
    });
    
  }

  onSubmit(){
    //check if it's new log
    if(this.isNew){
      //add a new log
      const newLog= { 
        id: this.uuid.getDashFreeUUID(), 
        text: this.text, 
        date: new Date()}
      this.logService.addLog(newLog);
    }else {
      //update the current log
      const updLog = { id: this.id, text: this.text, date: new Date() }
      this.logService.updateLog(updLog);
      
    }
    this.clearState();
  }

  clearState(){
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = '';
    this.isValue = 'Add log';
  }
}
