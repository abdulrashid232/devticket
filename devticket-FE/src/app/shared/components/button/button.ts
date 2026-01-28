import { Component, input, output } from '@angular/core';

export type ButtonVariant = 'primary';
export type ButtonSize = 'sm' | 'md' | 'lg';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class Button {
  variant = input<ButtonVariant>('primary');
  size = input<ButtonSize>('md');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  fullWidth = input<boolean>(false);

  clicked = output<MouseEvent>();

  get buttonClasses(): string {
    const baseClasses =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 ease-in-out focus:outline-none disabled:cursor-not-allowed border';

    const variantClasses: Record<ButtonVariant, string> = {
      primary:
        'bg-[var(--primary-500)] border-[var(--primary-400)]/50 text-white shadow hover:bg-[var(--primary-600)] focus-visible:shadow-[0_0_0_3px_var(--primary-300)] active:bg-[var(--primary-700)] active:shadow-none disabled:bg-[var(--primary-300)] disabled:border-[var(--primary-300)]',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    };

    const widthClass = this.fullWidth() ? 'w-full' : '';

    return `${baseClasses} ${variantClasses[this.variant()]} ${sizeClasses[this.size()]} ${widthClass}`.trim();
  }

  onClick(event: MouseEvent): void {
    if (!this.disabled()) {
      this.clicked.emit(event);
    }
  }
}
