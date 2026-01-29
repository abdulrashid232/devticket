## Input Usage

- Password

<app-custom-input
label="Password"
type="password"
placeholder="Enter password"
leftIcon="lock"
hint="Must be at least 8 characters"
[required]="true"
/>

- Email
  <app-custom-input
  label="Email Address"
  type="email"
  placeholder="you@example.com"
  leftIcon="email"
  [required]="true"
  [errorMessage]="emailError"
  />

- Search Input
  <app-custom-input
    type="search"
    size="lg"
    variant="filled"
    placeholder="Search products..."
    leftIcon="search"
  />

- input size
  <app-custom-input label="Small" size="sm" placeholder="Small input" />
  <app-custom-input label="Medium" size="md" placeholder="Medium input" />
  <app-custom-input label="Large" size="lg" placeholder="Large input" />
