import { Component, inject, signal } from '@angular/core';
import { InputUi } from '../input-ui/input';
import { Button } from '../button/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  imports: [InputUi, Button, ReactiveFormsModule],
  templateUrl: './header.html',
})
export class Header {
  private formBuilder = inject(FormBuilder);
  public searchForm = this.formBuilder.group({
    search: [''],
  });

  public userName = signal('Abdul Musah');
  public position = signal('Administrator');
  public userProfileImage = signal('/assets/images/user-profile.png');
}
