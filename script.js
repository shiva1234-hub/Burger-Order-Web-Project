const $ = (el) => document.querySelector(el),
    make = (el) => document.createElement(el),
    types =
        [
            { bun: [{ "Brown Bread": 12 }, { "Whole Wheat": 15 }, { "Multigrain": 20 }, { "White Bread": 10 },] },
            { cheese: [{ "No cheese": 0 }, { "Double Cheese": 20 }, { "CheeseBurst!": 25 }, { "Single Cheese": 10 },] },
            { tikki: [{ "Paneer Tikki": 15 }, { "Chicken Tikki": 20 }, { "Soyabean Tikki": 12 }, { "Aalu Tikki": 10 },] },
            { stuffing: [{ "Olives": 10 }, { "Lettuce": 8 }, { "Onions": 8 }, { "Tomatoes": 5 },] },
            { sauce: [{ "Thousand Island": 5 }, { "Mustard Sause": 5 }, { "Green Chili Sause": 8 }, { "Mayonise": 2 },] },
        ],
    optNames = ["bun", "cheese", "tikki", "stuffing", "sauce"],
    app = new Vue({
        el: '#root',
        data: {
            burger: [],
            burgerPrice: [],
            currentNum: 0,
            options: ["Brown Bread", "Whole Wheat", "Multigrain", "White Bread"],
            currentChoice: "bun",
            totalPrice: 0
        },
    })
const myform = $("#myform")
const smallwrap = $("#smallwrap")
const finbut = make("button")
let bunColor
myform.addEventListener("click", (event) => {
    if (app.currentNum < 4) {
        myform.querySelector(`input[value="${event.target.innerText}"]`).checked = true
        var thing = make("div")
        thing.classList.add(app.currentChoice)
        var choosed = myform.querySelector("input[name=option]:checked")
        thing.id = choosed.value
        thing.innerText = choosed.value
        if (app.currentNum == 0) {
            switch (thing.innerText) {
                case "Brown Bread": {
                    bunColor = "chocolate"
                    break
                }
                case "Whole Wheat": {
                    bunColor = "rgb(245, 185, 73)"
                    break
                }
                case "Multigrain": {
                    bunColor = "chocolate"
                    break
                }
                case "White Bread": {
                    bunColor = "rgb(245, 185, 73)"
                    break
                }
            }
            thing.style.backgroundColor = bunColor
        }
        if(app.currentNum==3){
            switch (thing.innerText) {
                case "Olives": {
                    thing.style.backgroundColor = "green"
                    break
                }
                case "Lettuce": {
                    thing.style.backgroundColor = "greenyellow"
                    break
                }
                case "Onions": {
                    thing.style.backgroundColor = "pink"
                    break
                }
                case "Tomatoes": {
                    thing.style.backgroundColor = "crimson"
                    break
                }
            }
        }
        $("#bottombun").style.backgroundColor = bunColor
        if (!(choosed.value == "No cheese"))
            smallwrap.appendChild(thing)
        if (choosed.value == 'Double Cheese') {
            var newThing = make("div")
            newThing.classList.add(app.currentChoice)
            smallwrap.appendChild(newThing)
            // thing.style.flexBasis = 2
            // smallwrap.appendChild(thing)
        }
        app.burger.push(choosed.value)
        curOpts = types[app.currentNum][app.currentChoice]
        curOpts.forEach((val) => {
            if (Object.keys(val)[0] == choosed.value) 
            app.burgerPrice.push(val[choosed.value]) 
        })
        app.currentNum++
        app.currentChoice = optNames[(app.currentNum)]
        optArr = []
        arr = (types[(app.currentNum)][app.currentChoice])
        arr.forEach((val) => optArr.push(Object.keys(val)[0]))
        app.options = optArr
    }
    else {
        myform.querySelector(`input[value="${event.target.innerText}"]`).checked = true
        var thing = make("div")
        thing.classList.add(app.currentChoice)
        var choosed = myform.querySelector("input[name=option]:checked")
        thing.id = choosed.value
        thing.innerText = choosed.value
        
        smallwrap.appendChild(thing)
        app.burger.push(choosed.value)
        curOpts = types[app.currentNum][app.currentChoice]
        curOpts.forEach((val) => { if (Object.keys(val)[0] == choosed.value) app.burgerPrice.push(val[choosed.value]) })
        $("#action").innerHTML = "<h3>Do You want a burger like this?</h3>"
        $("#myform").remove()
        
        finbut.id = "final"
        finbut.innerHTML = "<h1>Yes, Show my Bill</h1>"
        $("#buttonspace").appendChild(finbut)

        app.burger = app.burger.map((name, index) => [name, app.burgerPrice[index]])
        app.totalPrice = app.burgerPrice.reduce((currentTotal, itemPrice) => currentTotal + itemPrice)

        $("#final").addEventListener("click", final)

    }
})
function final(){
    $("#action").innerHTML = "<h3>Your Bill</h3>"
    finbut.remove()
    $("#bigwrap").style.display = "none"
    $("#bill").style.display = "flex"
    const orBut = make("button")
    orBut.id = "order"
    orBut.innerHTML = `<h1>Pay ₹${app.totalPrice} and Buy!</h1>`
    $("#buttonspace").appendChild(orBut)
    $("#order").addEventListener("click", () => {
        $("#action").innerHTML = "<h3>Your Order is Ready! Thank you for ordering at Hot Cross Buns</h3>"
        $("#bigwrap").style.display = "flex"
        $("#bigwrap").style.flexDirection = "column"
        logout = make("button")
        logout.innerHTML = "<h1>Logout</h1>"
        $("#buttonspace").appendChild(logout)
        logout.addEventListener("click", () => {
            location.replace("../index.html");
        })
        $("#bill").style.display = "none"
        orBut.remove()
    })
}