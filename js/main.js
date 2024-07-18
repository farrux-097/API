let elList = document.querySelector(".get-users-list")
let elModal = document.querySelector(".modal")

function getUsers(){
    axios.get('https://reqres.in/api/users').then(res => {
        res.data.data.map(item => {
            let element = document.createElement("li")
            element.className ="w-[31%] bg-white  text-gray-500 text-[25px] rounded-md p-[15px] space-y-[25px] mb-5"
            element.innerHTML = `
                <div class="space-y-[4px] ">
                    <p>Name: <b>${item.first_name}</b></p>
                    <p>Lastname: <b>${item.last_name}</b></p>
                    <p>UserID: <b>${item.id}</b></p>
                 </div>
                        <button type="button" onclick="handleOrder(${item.id})" class="w-full py-[6px] bg-blue-500 text-white rounded-md font-semibold">Order</button>
            `
            elList.append(element)
            
        })
    })
}
function handleOrder(id){
    axios.get('https://reqres.in/api/users').then(result => {
        let newObj = result.data.data.find(item => item.id == id)
        elModal.innerHTML = `
        <div class="p-5 rounded-md absolute bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex items-center gap-[100px]">
                <div class="flex flex-col gap-2 items-start">
                    <p class="text-[15px] text-gray-500"><b>UserID:</b> ${newObj.id}</p>
                    <p class="text-[15px] text-gray-500"><b>User Full Name:</b> ${newObj.first_name} ${newObj.last_name}</p>
                    <p class="text-[15px] text-gray-500"><b>Email:</b> ${newObj.email}</p>
                    <a onclick="sendMessage(${newObj.id})"  class="px-14 py-2 bg-blue-500 rounded-lg text-white font-bold" target="_blank">Telegram</a>
                </div>
            </div>
            <button onclick="handleBack()" class="absolute pointer bg-blue-600 w-[20px] h-[20px] flex justify-center items-center rounded-md right-3 top-3 text-white">X</button>
        </div>
        `
    })
    elModal.classList.add("scale-100")
}

getUsers()

function handleBack(){
    elModal.classList.remove("scale-100")
}


let CHAT_ID = "-1002229097714"
let TOKEN = "7140400458:AAF-nx57oeUAXofPCevo52VdvVVCEkyPdhc"
let URL = `https://api.telegram.org/bot${TOKEN}/sendMessage`


function sendMessage(id){
    axios.get(`https://reqres.in/api/users/${id}`).then(result => {
        let sms = `<b>Order</b>\n`
        sms += `<p>Name: ${result.data.data.first_name}</p>\n`
        sms += `<p>Surname: ${result.data.data.first_name}</p>\n`
        sms += `<p>User email: ${result.data.data.email}</p>\n`
        axios.post(URL, {
            chat_id: CHAT_ID,
            parse_mode: "html",
            text: sms
        }).then(result => {
            console.log(result);
        });
    })
}