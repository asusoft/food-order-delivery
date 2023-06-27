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


const utils = {
    isValidEmail,
    validateEmail,
};

export default utils;