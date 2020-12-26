var tabla = document.getElementById('tabla')
var boton = document.getElementById('button')
var inputs = document.getElementsByTagName('input')
var showTotal = document.getElementById('total')

var total = 0
var idCounter = 1

boton.onclick = () => {
    let inputProduct = inputs[0].value
    let inputQuantity = Number(inputs[1].value)
    let inputPricePerUnity = Number(inputs[2].value)
    
    if(!inputProduct || !inputQuantity || !inputPricePerUnity){
        inputs[0].style.border = '2px solid red'
        return false
    }

    createNewProduct()
    clearInputs()
}

function createNewProduct(){
    // creadores de elementos
    // crea row de tabla
    const row = document.createElement('tr')
    // despliega nombre producto
    const producto = document.createElement('td')
    // despliega cantidad del producto
    const cantidad = document.createElement('td')
    // despliega
    const precio = document.createElement('td')
    // crea celda para para icono
    const iconoCel = document.createElement('td')
    // crea icono
    const icon = document.createElement('i')
    //precio del producto 
    let totalPerProduct = inputs[1].value * inputs[2].value
    
    producto.innerHTML = inputs[0].value
    cantidad.innerHTML = inputs[1].value
    precio.innerHTML = totalPerProduct.toFixed(2)
    icon.classList.add('fas')
    icon.classList.add('fa-trash-alt')
    icon.id = idCounter
    iconoCel.appendChild(icon)
    row.appendChild(producto)
    row.appendChild(cantidad)
    row.appendChild(precio)
    row.appendChild(iconoCel)
    row.id = `row${idCounter}`
    idCounter++
    tabla.appendChild(row)

    total += totalPerProduct

    showTotal.innerHTML = total.toFixed(2)

    icon.onclick = () => {
        removeItem(icon.id, totalPerProduct)
    }
}

function removeItem(id, price){
    const rowToDelete = document.getElementById(`row${id}`)
    rowToDelete.remove()
    total -= price
    showTotal.innerHTML = total.toFixed(2)
}

function clearInputs(){
    for(var i=0; i<inputs.length; i++){
        inputs[i].value = ''
        inputs[i].style.border = '1px solid black'
    }
}

function checkTrueValue(inputid){
    if(inputid !== 0){
        let input = Number(inputs[inputid].value)
        if(!input){
            inputs[inputid].style.border = '2px solid red'
        } else {
            inputs[inputid].style.border = '2px solid green'
        }
    } else {
        if(!inputs[inputid].value){
            inputs[inputid].style.border = '2px solid red'
        } else {
            inputs[inputid].style.border = '2px solid green'
        }
    }
}