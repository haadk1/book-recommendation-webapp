
/**
 * helper function to handle switching back to main view and setting
 * auth variable to true when signing up
 * @param {*} setCurrent 
 * @param {*} setAuth 
 */
function updateFromSignup(setCurrent, setAuth){
    setCurrent(1);
    setAuth(true);
}

export {updateFromSignup}