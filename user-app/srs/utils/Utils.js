export const isValidEmail = value => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

export const validateEmail = (value, setEmailError) => {
    if (value == '') {
        setEmailError('');
    } else if (isValidEmail(value)) {
        setEmailError('');
    } else {
        setEmailError('Invalid Email');
    }
};


const utils = {
    isValidEmail,
    validateEmail,
};

export default utils;