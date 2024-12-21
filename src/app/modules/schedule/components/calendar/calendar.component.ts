import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Day } from './models/day';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'
})
export class CalendarComponent implements OnInit, OnChanges {

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedDay = 0
    this.loadCalendar()
  }

  ngOnInit(): void {
    this.loadCalendar()
  }
  days: Day[] = []
  selectedDay: number = 0

  @Input() avaiableDays !: number[]

  @Input() calendarMont !: Date

  @Input() error : string = "Erro"

  @Output() changeMonthEvent = new EventEmitter<Date>()

  @Output() selectedDateEvent = new EventEmitter<Date>()


  onSelectedDay(day: number){
    this.selectedDay = day
    this.selectedDateEvent.emit(new Date(this.calendarMont.getFullYear(), this.calendarMont.getMonth(), this.selectedDay))
  }

  loadCalendar(){
    this.days =
    [
      ... this.getBlankInitialDays(this.calendarMont.getFullYear(), this.calendarMont.getMonth()),
      ... this.getDaysInMonth(this.calendarMont.getFullYear(), this.calendarMont.getMonth())
    ]
    this.days =
    [
      ... this.days,
      ... this.getBlankEndDays(this.calendarMont.getFullYear(), this.calendarMont.getMonth(), this.days.length)
    ]
  }
  getBlankEndDays(year: number, month: number, length: number) {
    let rest = 7 - length % 7
    let days: Day[] = []

    for(let i = 0; i<rest; i++){
      days.push({} as Day)
    }

    if(days.length + length == 35){
      for(let i = 0; i< 7; i++){
        days.push({} as Day)
      }
    }

    return days
  }

  getBlankInitialDays(year: number, month: number): Day[] {
    let firstDay = this.getFirstDayInMonth(year, month)
    let emptyDays: number = 0
    let daywekk = firstDay.getDay()
    let days: Day[] = []

    if(daywekk == 0){
      emptyDays = 6
    }else {
      emptyDays = daywekk-1
    }

    for(let i = 0; i< emptyDays; i++){
      days.push({} as Day)
    }
    return days
  }
  getFirstDayInMonth(year: number, month: number): Date {
    return new Date(year, month, 1)
  }

  getDaysInMonth(year: number, month: number): Day[] {
    let numberOfDays: number = this.getNumberOfDays(year, month)
    let days: Day[] = []

    for( let i=1; i<= numberOfDays; i++){
      if(this.avaiableDays.includes(i)){
        days.push({
          day: i,
          available: true
        })
      }else {
        days.push({
          day: i,
          available: false
        })
      }
    }
    return days
  }

  getNumberOfDays(year: number, month: number): number {
    return new Date(year,month+1,0).getDate()
  }

  onNextMonth(){
    this.calendarMont = new Date(this.calendarMont)
    this.calendarMont.setMonth(this.calendarMont.getMonth() + 1)
    this.calendarMont.setDate(1)
    this.loadCalendar()
    this.selectedDay = 0
    this.changeMonthEvent.emit(new Date(this.calendarMont))
  }

  onPreviusMonth(){
    let previusDate  = new Date(this.calendarMont)
    previusDate.setMonth(previusDate.getMonth() - 1)
    previusDate.setDate(1)
    if(this.isDateInFuture(previusDate)){
      this.calendarMont = previusDate
    }else if (this.isDateInCurrentMonthYear(previusDate)){
      previusDate.setDate(new Date().getDate())
      this.calendarMont = previusDate
    }
    this.loadCalendar()
    this.selectedDay = 0
    this.changeMonthEvent.emit(new Date(this.calendarMont))
  }

  showPreviousMonth(): boolean {
    return !this.isDateInCurrentMonthYear(this.calendarMont)
  }

  isDateInFuture = (date:Date): boolean => date >= new Date
  isDateInCurrentMonthYear = (date: Date):boolean => date.getMonth() == new Date().getMonth() &&  date.getFullYear() == new Date().getFullYear()
}
