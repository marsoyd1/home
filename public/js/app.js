function createItem(data, action){
    let body = document.querySelector("body")
    let div = document.querySelector(".div_body")

    console.log('ok')

    let div1 = document.createElement('div');
    div1.classList.add('w-full', 'bg-gray-200', 'border-b-2', 'flex', 'border-black')

    let p1 = document.createElement('p')
    p1.innerText = action

    let p2 = document.createElement('p');
    p2.innerText = new Date(data).toLocaleString();
    p2.classList.add('ml-4')

    div.appendChild(p2)
    div.appendChild(p1)

}

function getItems() {
    let items = [];
    pass = 12345678
    fetch('http://localhost:3000/admin/logs', {
        method: 'GET',
    })
        .then((response) => { return response.json(); })
        .then((data) => {items = data})
        .finally(() => {
            console.log(items)
            for (let i = 0; i < items.length; i++) {
                createItem(items[i].dataaction, items[i].action)
            }
        })
}


getItems();