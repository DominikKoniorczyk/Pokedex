const BASE_URL = "https://testprojectdominikkon-default-rtdb.europe-west1.firebasedatabase.app/";

let names = [];

async function onLoad(){
    let userResponse = await getAllUsers("namen");

    let userKeysArray = Object.keys(userResponse);

    for(let i = 0; i < userKeysArray.length; i++)
    {
        names.push({
            id : userKeysArray[i],
            user : userResponse[userKeysArray[i]],
        })
    }

    await addEditSingleUser(names[0].id, {name: "Spongebob"});
}

async function loadData(){
    let response = await fetch(BASE_URL + ".json");
    let responseToJson = await response.json;
    console.log(responseToJson);
}

async function postData(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

async function deleteData(path=""){
let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT"
    });
    return responseToJson = await response.json();
}

// neu

async function putData(path="", data={}){
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
}

async function addEditSingleUser(id=11, user={name: "Dominik"})
{
    putData(`namen/${id}`, user);
}

async function getAllUsers(path){
    const response = await fetch(BASE_URL + path + ".json");
    return responseToJson = await response.json();
}

