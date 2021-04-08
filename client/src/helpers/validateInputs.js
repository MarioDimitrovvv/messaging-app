export function validateInputs(input, isRegister) {
    let msg = undefined;
    // trim the inputs
    if(input.firstName?.includes(' ') || input.lastName?.includes(' ')) {
        msg = 'Please enter valid name!';
    }

    if(isRegister && input.password !== input.repeatPassword) {
        msg = 'Passwords missmatch!'
    }
    
    return msg; 
}