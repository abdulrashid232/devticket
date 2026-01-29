import { Component, input, output } from '@angular/core';
import { ButtonVariant, ButtonSize } from './button.model';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('md');
  public disabled = input<boolean>(false);
  public type = input<'button' | 'submit' | 'reset'>('button');
  public fullWidth = input<boolean>(false);

  public clicked = output<MouseEvent>();

  public get buttonClasses(): string {
    const baseClasses =
      'inline-flex items-center justify-center font-medium text-white transition-all duration-150 ease-in-out focus:outline-none cursor-pointer disabled:cursor-not-allowed';

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'border bg-[var(--primary-500)] border-[var(--primary-400)]/40 shadow hover:bg-[var(--primary-600)] focus-visible:shadow-[0_0_0_3px_var(--primary-300)] active:bg-[var(--primary-700)] active:shadow-none active:translate-y-px disabled:bg-[var(--primary-300)] disabled:border-[var(--primary-300)]',
      outline:
        'bg-neutral-800 hover:bg-neutral-800/85 border border-neutral-700 shadow active:shadow-none active:bg-neutral-800/50 active:translate-y-px',
      'outline-flat':
        'bg-transparent hover:bg-neutral-800/85 border border-neutral-700 shadow active:shadow-none active:bg-neutral-800/50 active:translate-y-px',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    };

    const widthClass: string = this.fullWidth() ? 'w-full' : '';

    return `${baseClasses} ${variantClasses[this.variant()]} ${sizeClasses[this.size()]} ${widthClass}`.trim();
  }

  public onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
