import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  forwardRef,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { 
  heroMagnifyingGlass, 
  heroEnvelope, 
  heroPhone, 
  heroUser, 
  heroLockClosed, 
  heroEye, 
  heroEyeSlash,
  heroExclamationCircle 
} from '@ng-icons/heroicons/outline';
import { InputSize, InputType, InputVariant } from './input.model';

@Component({
  selector: 'app-input',
  imports: [CommonModule, NgIconComponent],
  templateUrl: './input.html',
  styleUrl: './input.css',
  encapsulation: ViewEncapsulation.None,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputUi),
      multi: true,
    },
  ],
  viewProviders: [
    provideIcons({ 
      heroMagnifyingGlass, 
      heroEnvelope, 
      heroPhone, 
      heroUser, 
      heroLockClosed, 
      heroEye, 
      heroEyeSlash,
      heroExclamationCircle 
    })
  ]
})
export class InputUi implements ControlValueAccessor {
  public value = signal<string>('');
  public isFocused = signal<boolean>(false);
  public showPassword = signal<boolean>(false);
  public isDisabled = signal<boolean>(false);

  public type = input<InputType>('text');
  public size = input<InputSize>('md');
  public variant = input<InputVariant>('outlined');

  public label = input<string>('');
  public placeholder = input<string>('');
  public hint = input<string | undefined>();
  public errorMessage = input<string | undefined>();

  public required = input<boolean>(false);
  public disabled = input<boolean>(false);
  public readonly = input<boolean>(false);

  public maxLength = input<number | undefined>();
  public minLength = input<number | undefined>();
  public pattern = input<string>('');
  public autocomplete = input<string>('');

  public leftIcon = input<string>('');
  public rightIcon = input<string>('');

  public showCharacterCount = input<boolean>(false);

  public inputChange = output<string>();
  public inputFocus = output<FocusEvent>();
  public inputBlur = output<FocusEvent>();

  public hasError = computed(() => !!this.errorMessage);
  public hasValue = computed(() => this.value().length > 0);
  public characterCount = computed(() => this.value().length);
  public maxCharacters = computed(() => this.maxLength || 0);

  effectiveType = computed(() => {
    if (this.type() === 'password' && this.showPassword()) {
      return 'text';
    }
    return this.type();
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

    
    const sizeClasses = {
      sm: 'h-9 px-3 text-sm gap-2',
      md: 'h-11 px-4 text-base gap-3',
      lg: 'h-13 px-6 text-lg gap-4',
    };

    
    const variantClasses = {
      outlined: 'bg-transparent border-neutral-300 hover:border-neutral-400 hover:shadow-sm',
      filled: 'bg-neutral-100 border-transparent hover:bg-neutral-200',
      ghost:
        'bg-transparent border-transparent border-b-2 border-b-neutral-300 rounded-none hover:border-b-neutral-400',
    };

    
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
        stateClasses = 'border-b-[var(--base-400)]';
      } else {
        stateClasses = 'border-[var(--base-400)] hover:border-[var(--base-400)]';
      }
      if (this.isFocused()) {
        stateClasses += ' ring-4 ring-[var(--base-400)]/15';
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
      `inline-flex items-center justify-center flex-shrink-0 text-neutral-400 transition-colors duration-150 ${this.iconSizeClasses()}`,
  );

  toggleButtonClasses = computed(
    () =>
      `inline-flex items-center justify-center flex-shrink-0 text-neutral-400 transition-all duration-150 cursor-pointer p-1 -m-1 rounded hover:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 active:scale-95 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2 ${this.iconSizeClasses()}`,
  );

  errorIconClasses = computed(
    () =>
      `inline-flex items-center justify-center flex-shrink-0 text-[var(--base-400)] transition-colors duration-150 ${this.iconSizeClasses()}`,
  );

  
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

  getIconName(iconKey: string): string {
    const iconMap: Record<string, string> = {
      'search': 'heroMagnifyingGlass',
      'email': 'heroEnvelope',
      'phone': 'heroPhone',
      'user': 'heroUser',
      'lock': 'heroLockClosed',
      'eye': 'heroEye',
      'eye-off': 'heroEyeSlash',
      'alert-circle': 'heroExclamationCircle'
    };
    return iconMap[iconKey] || '';
  }
}
