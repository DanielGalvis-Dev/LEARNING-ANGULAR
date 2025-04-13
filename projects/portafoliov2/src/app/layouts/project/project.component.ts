import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatChipsModule, NgClass],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  @Input('isFirst') isFirst!: boolean;
  @Input('name') name: string =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit.';
  @Input('description') description: string =
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste vitae architecto esse quaerat suscipit tenetur sit? Fugit, voluptatum consequuntur omnis rem aperiam accusantium soluta asperiores iusto debitis maiores consectetur corrupti.';
  @Input('link') link: string = 'https://www.example.com';
  @Input('tools') tools: string[] = ['HTML', 'CSS', 'JS'];
}
