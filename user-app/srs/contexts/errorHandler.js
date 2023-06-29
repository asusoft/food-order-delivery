export const handleSignUpError = (error, setPasswordError, setEmailError, setPhoneNumberError) => {
    const errorMessage = error.message.trim();

    if (errorMessage.includes("[auth/email-already-in-use]")) {
        setEmailError("Email already in use");
    } else if (errorMessage.includes("A user with the provided phone number exists!!!")) {
        setPhoneNumberError("Phone number in use.");
    } else if (errorMessage.includes("[auth/weak-password]")) {
        setPasswordError("The password is too weak.");
    } else {
        alert("Error signing up:", error.message);
    }
};

export const handleVerifyPhoneError = (error, setVerifyError) => {
    const errorMessage = error.message.trim();
    if (errorMessage.includes("We have blocked all requests from this device due to unusual activity")) {
        setVerifyError("Too many attempts");
    } else if (errorMessage.includes("A user with the provided phone number exists!!!")) {
        setVerifyError("Number already taken");
    } else if (errorMessage.includes("auth/invalid-verification-code")) {
        setVerifyError("Invalid code");
    } else if (errorMessage.includes("auth/internal-error")) {
        alert("Account cannot be verified at the moment, please try again later");
    } else if (errorMessage.includes("auth/code-expired")) {
        setVerifyError("SMS code has expired. Request a new code");
    } else {
        alert(error.message);
    }
};