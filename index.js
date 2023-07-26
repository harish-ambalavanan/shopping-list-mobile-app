import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-1be8b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

onValue(shoppingListInDB, function(snapshot){
    // snapshot.val() has the key and value of the data but, we are getting only the values below using Object.values()
    // const itemsArray = Object.values(snapshot.val())
    if(!snapshot.val()){
        shoppingListEl.textContent = "Nothing added yet..."
        return
    }
    const itemsArray = Object.entries(snapshot.val())
    clearshoppingListEl()
    itemsArray.forEach(function(item){
        appendItemToShoppingListEl(item)
    })
})

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    push(shoppingListInDB, inputValue)
    clearInputField()
    // appendItemToShoppingListEl(inputValue)
})



function clearInputField(){
    inputFieldEl.value = ""
}

function clearshoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemToShoppingListEl(itemEntry){
    const liNode = document.createElement("li")
    const itemID = itemEntry[0]
    const itemValue = itemEntry[1]
    // console.log(liNode);
    // const textnode = document.createTextNode(inputValue)
    // liNode.appendChild(textnode)
    liNode.textContent = itemValue
    console.log(liNode)
    shoppingListEl.appendChild(liNode)
    liNode.addEventListener('click', function(){
        const exactLocationOfItemInDB = ref(database, "shoppingList/"+itemID)
        // console.log(exactLocationOfItemInDB)
        remove(exactLocationOfItemInDB)
        shoppingListEl.removeChild(liNode)
    })
}