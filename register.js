const domElem = (elem) => document.querySelector(elem);
const valueOf = (elem) => domElem(elem).value;

const register = (email, password, confirmPassword) => {
    if (password !== confirmPassword) throw new Error(PASSWORD_MISSMATCH);
    fetch("http://localhost:3000/register", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({email: email, password: password}),
    })
    .then((response) => response.json())
    .then((obj) => console.log(obj.data))
    .catch((error) => console.log(error));
};

domElem("#registerbtn").onclick = (event) => {
    event.preventDefault()
    const email =valueOf("#email")
    const password = valueOf("#psw")
    const confirmPassword = valueOf("#psw-repeat")

    register(email, password, confirmPassword)
}