import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  heroArrowPath,
  heroCog6Tooth,
  heroQueueList,
  heroSquares2x2,
} from '@ng-icons/heroicons/outline';
import { provideIcons } from '@ng-icons/core';
import { Sidebar } from './layout/sidebar/sidebar';
import { SidebarMenu } from './layout/sidebar/sidebar.model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
  viewProviders: [provideIcons({ heroSquares2x2, heroQueueList, heroArrowPath, heroCog6Tooth })],
})
export class App {
  sidebarMenu: SidebarMenu = [
    { icon: 'heroSquares2x2', label: 'Dashboard', path: '/dashboard' },
    { icon: 'heroQueueList', label: 'Issues', path: '/issues' },
    { icon: 'heroArrowPath', label: 'Sprint', path: '/sprint' },
    { icon: 'heroCog6Tooth', label: 'Settings', path: '/settings' },
  ];
}
