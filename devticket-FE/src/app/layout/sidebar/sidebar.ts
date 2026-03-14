import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { Button } from '../../shared/components/button/button';
import { SidebarMenu } from './sidebar.model';

@Component({
  selector: 'app-sidebar',
  imports: [Button, NgIcon, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  menu = input.required<SidebarMenu>();
}
