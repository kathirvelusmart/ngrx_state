import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeProjectName, customCounter } from 'src/app/counter/state/counter.action';
import { getProjectName } from 'src/app/counter/state/counter.selectors';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value!: number
  projectName!: string
  changedProjectName!: string
  _projectname$ !: Observable<string>
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    /*  this.store.select(getProjectName).subscribe((projectName) => {
       console.log('Projectname observable is called')
       this.projectName = projectName;
     }) */
    this._projectname$ = this.store.select(getProjectName)
  }
  onAdd() {
    console.log(this.value)
    this.store.dispatch(customCounter({ count: +this.value }));
  }
  onChangeText() {
    this.store.dispatch(changeProjectName({ newProjectname: this.changedProjectName }))
  }
}
