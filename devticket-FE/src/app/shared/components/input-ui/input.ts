import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { InputSize, InputType, InputVariant } from './input.model';

@Component({
  selector: 'app-input',
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUi),
      multi: true,
    },
  ]
})
export class InputUi implements ControlValueAccessor {
  public value = signal<string>('');
  public isFocused = signal<boolean>(false);
  public showPassword = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);

  // constructor(private sanitizer: DomSanitizer) {}
  private sanitizer = inject(DomSanitizer);

  public type = input<InputType>('text');
  public size = input<InputSize>('md');
  public variant = input<InputVariant>('outlined');

  public label? = input<string | undefined>('');
  public placeholder? = input<string | undefined>('');
  public hint? = input<string | undefined>();
  public errorMessage? = input<string | undefined>();

  public required = input<boolean>(false);
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);

  public maxLength? = input<number | undefined>();
  public minLength? = input<number | undefined>();
  public pattern? = input<string | undefined>('');
  public autocomplete? = input<string | undefined>('');

  public leftIcon? = input<string | undefined>('');
  public rightIcon? = input<string | undefined>('');

  public showCharacterCount = input<boolean>(false);

  public inputChange = output<string>();
  public inputFocus = output<FocusEvent>();
  public inputBlur = output<FocusEvent>();

  hasError = computed(() => !!this.errorMessage);
  hasValue = computed(() => this.value().length > 0);
  characterCount = computed(() => this.value().length);
  maxCharacters = computed(() => this.maxLength || 0);

  effectiveType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type;
  });

  canTogglePassword = computed(() => this.type() === 'password');

  wrapperClasses = computed(() => 'flex flex-col gap-2 w-full');

  labelClasses = computed(() => {
    const base =
      'inline-flex items-center gap-1 text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-tight transition-colors duration-150';
    return base;
  });

  containerClasses = computed(() => {
    const base = 'relative flex items-center w-full rounded-lg transition-all duration-200 border';

    // Size classes
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm gap-2',
      md: 'h-11 px-4 text-base gap-3',
      lg: 'h-13 px-6 text-lg gap-4',
    };

    // Variant classes
    const variantClasses = {
      outlined: 'bg-white border-neutral-300 hover:border-neutral-400 hover:shadow-sm',
      filled: 'bg-neutral-100 border-transparent hover:bg-neutral-200',
      ghost:
        'bg-transparent border-transparent border-b-2 border-b-neutral-300 rounded-none hover:border-b-neutral-400',
    };

    // State classes
    let stateClasses = '';

    if (this.isFocused() && !this.hasError()) {
      if (this.variant() === 'ghost') {
        stateClasses = 'border-b-blue-500';
      } else {
        stateClasses = 'border-blue-500 ring-4 ring-blue-500/15';
      }
    }

    if (this.hasError()) {
      if (this.variant() === 'ghost') {
        stateClasses = 'border-b-red-500';
      } else {
        stateClasses = 'border-red-500 hover:border-red-600';
      }
      if (this.isFocused()) {
        stateClasses += ' ring-4 ring-red-500/15';
      }
    }

    if (this.isDisabled()) {
      stateClasses = 'opacity-60 cursor-not-allowed bg-neutral-100 border-neutral-200';
    }

    if (
      this.variant() === 'outlined' &&
      this.isFocused() &&
      !this.hasError() &&
      !this.isDisabled()
    ) {
      stateClasses += ' bg-neutral-50';
    }

    return `${base} ${sizeClasses[this.size()]} ${variantClasses[this.variant()]} ${stateClasses}`;
  });

  iconSizeClasses = computed(() => {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
      lg: 'w-6 h-6',
    };
    return sizes[this.size()];
  });

  inputClasses = computed(() => {
    const base =
      'flex-1 w-100% min-w-0 bg-transparent border-none outline-none font-normal text-neutral-900 dark:text-neutral-100 leading-normal transition-colors duration-150 placeholder:text-neutral-400 outline-none dark:placeholder:text-neutral-500';
    const disabled = this.isDisabled()
      ? 'cursor-not-allowed text-neutral-500 dark:text-neutral-400'
      : '';
    const sizes = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    return `${base} ${sizes[this.size()]} ${disabled}`;
  });

  iconClasses = computed(
    () =>
      `inline-flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-400 transition-colors duration-150 ${this.iconSizeClasses()}`,
  );

  toggleButtonClasses = computed(
    () =>
      `inline-flex items-center justify-center flex-shrink-0 text-neutral-500 dark:text-neutral-400 transition-all duration-150 cursor-pointer p-1 -m-1 rounded hover:text-neutral-700 dark:hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${this.iconSizeClasses()}`,
  );

  errorIconClasses = computed(
    () =>
      `inline-flex items-center justify-center flex-shrink-0 text-red-500 dark:text-red-400 transition-colors duration-150 ${this.iconSizeClasses()}`,
  );

  //CVA Implementation
  private onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  // Event handlers
  onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const newValue = inputElement.value;
    this.value.set(newValue);
    this.onChange(newValue);
    this.inputChange.emit(newValue);
  }

  onFocus(event: FocusEvent): void {
    this.isFocused.set(true);
    this.inputFocus.emit(event);
  }

  onBlur(event: FocusEvent): void {
    this.isFocused.set(false);
    this.onTouched();
    this.inputBlur.emit(event);
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((value) => !value);
  }

  // Icon helpers
  getLeftIconSvg(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.getIconSvg(this.leftIcon?.() || ''));
  }

  getRightIconSvg(): SafeHtml {
    if (this.canTogglePassword()) {
      return this.sanitizer.bypassSecurityTrustHtml(
        this.showPassword() ? this.getIconSvg('eye-off') : this.getIconSvg('eye'),
      );
    }
    return this.sanitizer.bypassSecurityTrustHtml(this.getIconSvg(this.rightIcon?.() || ''));
  }

  getErrorIconSvg(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.getIconSvg('alert-circle'));
  }

  getIconSvg(iconName: string): string {
    const icons: Record<string, string> = {
      search:
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>',
      email:
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>',
      phone:
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      user: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
      lock: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
      eye: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>',
      'eye-off':
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" x2="22" y1="2" y2="22"/></svg>',
      'alert-circle':
        '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>',
    };
    return icons[iconName] || '';
  }
}
