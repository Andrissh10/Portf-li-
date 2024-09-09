
const domElem = (elem) => document.querySelector(elem);
const valueOf = (elem) => domElem(elem).value;

domElem("#loginbtn").onclick = (event) => {
    event.preventDefault()
    const email =valueOf("#email")
    const password = valueOf("#psw")
    
    fetch("http://localhost:3000/authenticate", {
        method:"POST", 
        headers: {
            "Content-Type": "application/json"
        }, 
        body:JSON.stringify({email, password})
    })
    .then((response) => {
        response.json().then((obj) => {
            if (response.ok) {
                console.log("Sikeresen bejelentkezett"); //ezt lehet helyettesíteni
            } else {
                console.log(obj.data);
            }
        })
    })
    .catch((error) => console.log(error));
}


