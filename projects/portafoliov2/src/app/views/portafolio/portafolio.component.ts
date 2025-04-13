import { Component } from '@angular/core';
import { ProjectComponent } from '../../layouts/project/project.component';
import { HeaderComponent } from '../../layouts/header/header.component';
import { WorkExperienceComponent } from '../../layouts/work-experience/work-experience.component';
import { AsidesComponent } from '../../layouts/asides/asides.component';
import { Proyecto } from '../../Models/project';
import { workExperience } from '../../Models/workExperience';
import { listItems } from '../../Models/other';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [
    ProjectComponent,
    HeaderComponent,
    WorkExperienceComponent,
    AsidesComponent,
  ],
  templateUrl: './portafolio.component.html',
  styleUrl: './portafolio.component.scss',
})
export class PortafolioComponent {
  proyectos: Proyecto[] = [
    {
      nombre: 'Gestor de Tareas',
      descripcion:
        'Una aplicación web para gestionar tareas diarias y aumentar la productividad.',
      link: 'https://www.example.com',
      herramientas: ['TypeScript', 'React', 'Node.js', 'Express', 'MongoDB'],
    },
    {
      nombre: 'Tienda en Línea',
      descripcion:
        'Una plataforma de comercio electrónico para comprar y vender productos.',
      link: 'https://www.example.com',
      herramientas: ['JavaScript', 'Vue.js', 'Firebase', 'Bootstrap'],
    },
    {
      nombre: 'Blog Personal',
      descripcion: 'Un blog personal para compartir ideas y experiencias.',
      link: 'https://www.example.com',
      herramientas: ['Ruby', 'Rails', 'PostgreSQL', 'CSS'],
    },
  ];

  experiences: workExperience[] = [
    {
      position: 'Software Developer Analyst',
      company: 'SENA CNCA',
      link: 'https://sennovacolomboaleman.blogspot.com/',
      date: 'Feb 2023 - Ene 2024',
      tools: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'PHP',
        'MySQL',
        'Bootstrap',
        'jQuery',
        'APIs REST',
        'Git',
        'GitHub',
      ],
      description: [
        {
          title: 'Unified Motor Management Platform',
          achievements: [
            'Led the Full-Stack development (FrontEnd: HTML/CSS/JavaScript, BackEnd: PHP/MVC) of a platform for monitoring electric motors, improving web performance by 15% and reducing project delivery time by 10%.',
            'Optimized SQL queries (MySQL), increasing response speed by 30% through indexes and normalization.',
          ],
        },
        {
          title: 'Real-Time Monitoring System with IoT',
          achievements: [
            'Implemented dynamic interfaces (Bootstrap/jQuery) to visualize sensor data (temperature/voltage), integrating REST APIs for communication with hardware.',
            'Designed an alert system (EmailJS + SMS APIs) that reduced response time to technical failures by 40%.',
          ],
        },
        {
          title: 'Efficiency and Scalability Strategies',
          achievements: [
            'I introduced Git/GitHub for version control, reducing production errors by 20%.',
            'I explored solutions in Microsoft Azure for future scalability, reducing operating costs.',
          ],
        },
      ],
    },
  ];

  technicalSkills: listItems[] = [
    { name: 'HTML5', level: 'competent' },
    { name: 'CSS3', level: 'competent' },
    { name: 'JavaScript', level: 'competent' },
    { name: 'TypeScript', level: 'competent' },
    { name: 'Node.js', level: 'basic' },
    { name: 'Angular', level: 'competent' },
    { name: 'PHP', level: 'competent' },
    { name: 'MySQL', level: 'competent' },
    { name: 'Bootstrap', level: 'competent' },
    { name: 'Tailwind', level: 'competent' },
    { name: 'jQuery', level: 'competent' },
    { name: 'APIs REST', level: 'competent' },
  ];

  softSkills: listItems[] = [
    { name: 'Liderazgo en proyectos técnicos' },
    { name: 'Pensamiento crítico y resolución de problemas' },
    { name: 'Comunicación y colaboración multidisciplinaria' },
    { name: 'Creatividad en soluciones innovadoras' },
    { name: 'Gestión del tiempo y organización' },
    { name: 'Adaptabilidad y resiliencia' },
    { name: 'Liderazgo e influencia' },
    { name: 'Proactividad e iniciativa' },
    { name: 'Trabajo en equipo y colaboración' },
    { name: 'Inteligencia emocional' },
    { name: 'Comunicación efectiva' },
    { name: 'Actitud positiva' },
  ];

  languages: listItems[] = [
    {
      name: 'Español',
      level: 'Nativo',
    },
    {
      name: 'Inglés',
      level: 'B1',
    },
  ];
}
