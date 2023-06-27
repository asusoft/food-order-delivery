const isValidEmail = value => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};


const isValidPassword = value => {
    const re =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(value);
}

const isValidPhoneNumber = value => {
    const re =
        /^\d{10}$/;
    return re.test(value);
}

const isPasswordConfirmed = (value, password) => {
    return value == password
}


export const validateEmail = (value, setEmailError) => {
    if (value == '') {
        setEmailError('');
    } else if (isValidEmail(value)) {
        setEmailError('');
    } else {
        setEmailError('Invalid Email');
    }
};

export const validatePassword = (value, setPasswordError) => {
    if (value == '') {
        setPasswordError('');
    } else if (isValidPassword(value)) {
        setPasswordError('');
    } else {
        setPasswordError('Password must be at least 6 characters long and include an upper and lower cases, a digit, and a special character.');
    }
};

export const validatePhoneNumber = (value, setPhoneNumberError) => {
    if (value == '') {
        setPhoneNumberError('');
    } else if (isValidPhoneNumber(value)) {
        setPhoneNumberError('');
    } else {
        setPhoneNumberError('Enter Phone Number without the first 0');
    }
};

export const comparePassword = (value, password, setConfirmPasswordError) => {
    if (value == '') {
        setConfirmPasswordError('');
    } else if (isPasswordConfirmed(value, password)) {
        setConfirmPasswordError('');
    } else {
        setConfirmPasswordError('Password does not match');
    }
};

