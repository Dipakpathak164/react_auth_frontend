function Validation(values) {
    let error = {};
    console.log("Values received:", values);

    const email_pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/;
    const password_pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;

    if (values.name === "") {
        error.name = "Name should not be empty";
    } else {
        error.name = "";
    }

    if (values.email === "") {
        error.email = 'Email should not be empty';
    } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
    } else {
        error.email = "";
    }

    if (values.password === "") {
        error.password = 'Password should not be empty';
    } else if (!password_pattern.test(values.password)) {
        error.password = "Password must be at least 8 characters long and contain at least one letter and one digit";
    } else {
        error.password = "";
    }

    console.log("Validation result:", error);
    return error;
}

export default Validation;
