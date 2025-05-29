function getPasswordStatus(password) {

    let templates = [
        /^[A-Za-z0-9^$%@#&*!?]+$/, 
        /^.{8,}$/, /[A-Z]+/, /[a-z]+/, /[0-9]+/, 
        /^(?=(?:.*([\^$%@#&*!?])){2,})(?!.*\1.*\1).+$/, 
        /^(?!.*(.)\1).+$/
    ];

    let status = new Array(templates.length);

    for (let i = 0; i < templates.length; ++i) {

        if (password.match(templates[i]) != null) status[i] = 1;
    }

    return status;
}