import { Component, Input } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { content } from '../../Models/workExperience';

@Component({
  selector: 'app-work-experience',
  standalone: true,
  imports: [MatChipsModule],
  templateUrl: './work-experience.component.html',
  styleUrl: './work-experience.component.scss',
})
export class WorkExperienceComponent {
  @Input('position') position!: string;
  @Input('company') company!: string;
  @Input('date') date!: string;
  @Input('tools') tools!: string[];
  @Input('description') description!: content[];
  @Input('link') link!: string;
}
