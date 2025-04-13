import { Component, Input } from '@angular/core';
import { listItems } from '../../Models/other';

@Component({
  selector: 'app-asides',
  standalone: true,
  imports: [],
  templateUrl: './asides.component.html',
  styleUrl: './asides.component.scss',
})
export class AsidesComponent {
  @Input('title') title: string = '';
  @Input('body') body: string = '';
  @Input('items') items!: listItems[];
}
