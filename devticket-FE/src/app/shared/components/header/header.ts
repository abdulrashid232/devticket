import { Component, inject, signal } from '@angular/core';
import { InputUi } from '../input-ui/input';
import { Button } from '../button/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [InputUi, Button, ReactiveFormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private formBuilder = inject(FormBuilder);
  public searchForm = this.formBuilder.group({
    search: [''],
  });

  public userName = signal('Abdul Musah');
  public position = signal('Administrator');
  public userProfileImage = signal(
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBCBml1iVWHpkHdRr_ruQrrjA8o2v2PRwYnEHT69AzcMEWxbUJonDxyd7DTo2A3bA_hYwEkyimzTi3fQXdsBk1wph4IE9Gv6BsRX5k63pNFeJufiy8HYEj-9d1Xcjpjpe5Vx2-zV0pmcFykbDEjhOze0nIDh7yRmXnjO4GmS3emMgx8zyd7uZsmMtASL_8bIQ2a3VyvfsCsNR64FwyJbJD7t4mp7GEdrcLKGp6ihBJP8SIvq32ccQeQuBYsiYbfjN4ue6cCcyBmhTil',
  );
}
