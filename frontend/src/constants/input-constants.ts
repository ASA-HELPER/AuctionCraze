enum InputAdornmentPosition {
    End = 'end',
    Start = 'start',
}

enum InputPresets {
    Date = 'date',
    Dropdown = 'dropdown',
    Otp = 'otp',
    Phone = 'phone',
    Text = 'text',
    Password = 'password',
    Icon = 'icon',
    Email = 'email'
}

enum InputMode {
    Numeric = 'numeric',
}

enum DateFormatType {
    DateFormat = 'DD MMM, YY', // 01 Jan 24
    FullDateDashFormat = 'DD-MM-YYYY', // ex: 25-01-24
    FullDateFormat = 'DD MMM YYYY', // ex: 1st Jan, 2024
}

enum InputFieldVariant {
    Standard = 'standard',
}

enum InputIconPosition{
    Left = 'left',
    Right = 'right'
}

enum InputSizes{
    Small = 'small',
    Medium = 'medium',
}

enum InputType{
    Text = 'text',
    Password = 'password'
}

enum InputVariant{
    Standard = 'standard',
    Filled = 'filled',
    Outlined = 'outlined',
}

export {
    DateFormatType,
    InputAdornmentPosition,
    InputFieldVariant,
    InputMode,
    InputPresets,
    InputIconPosition,
    InputSizes,
    InputType,
    InputVariant
};
