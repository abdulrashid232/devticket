import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import type { ButtonVariant, ButtonSize } from './button.model';

@Component({
  selector: '[app-button]',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.full-width]': 'fullWidth()',
    '[class.size-sm]': 'size() === "sm"',
    '[class.size-md]': 'size() === "md"',
    '[class.size-lg]': 'size() === "lg"',
    '[class.variant-primary]': 'variant() === "primary"',
    '[class.variant-outline]': 'variant() === "outline"',
    '[class.variant-outline-flat]': 'variant() === "outline-flat"',
    '[attr.disabled]': 'disabled() || null',
    '(click)': 'onClick($event)',
  },
})
export class Button {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public disabled = input<boolean>(false);
  public type = input<'button' | 'submit' | 'reset'>('button');
  public fullWidth = input<boolean>(false);

  public clicked = output<MouseEvent>();

  public onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
