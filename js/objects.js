var table = document.getElementById('tabla')
var inputs = document.getElementsByTagName('input')
var showTotal = document.getElementById('total')
var rows = document.getElementsByTagName('tr')
var modal = document.getElementById('modal')
var borderWidth = 2
var wrongColor = 'red'
var okColor = 'green'
var inputsCleared = '#ffffffa1'

var products = []
var acum = 1
var total = 0

class Product {
    constructor(id, name, quantity, price){
        this.id = id
        this.name = name,
        this.quantity = quantity,
        this.price = price
        this.totalPrice = this.quantity * this.price
    }

    // totalProductPrice(){
    //     return this.quantity * this.price
    // }
}

function createProduct(){
    let productName = inputs[0].value
    let productQuantity = Number(inputs[1].value)
    let pricePerUnit = Number(inputs[2].value)

    if(!productName || !productQuantity || !pricePerUnit){
        if(!productName){
            inputs[0].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        }
        if(!productQuantity){
            inputs[1].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        }
        if(!pricePerUnit){
            inputs[2].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        }
        return false
    }

    let newProduct = new Product(acum, productName, productQuantity, pricePerUnit)

    products.push(newProduct)
    console.log(products)
    acum++

    createNewTableRow(newProduct)

    clearInputs()
    showTotalChart()
}

function clearInputs(){
    for(var i=0; i<inputs.length - 1; i++){
        inputs[i].value = ''
        inputs[i].style.borderBottom = `${borderWidth}px solid ${inputsCleared}`
    }
}

function createNewTableRow({name, quantity, price, totalPrice, id}){
    const newTableRow = document.createElement('tr')

    const tdForProdutc = document.createElement('td')
    const tdForQuantity = document.createElement('td')
    const tdForPrice = document.createElement('td')
    const tdForDeleteIcon = document.createElement('td')
    const icon = document.createElement('i')

    const dataCells = [tdForProdutc, tdForQuantity, tdForPrice, tdForDeleteIcon]

    newTableRow.id = `row${id}`

    icon.classList.add('fas')
    icon.classList.add('fa-minus-circle')
    icon.onclick = () => {
        removeProduct(id)
    }

    tdForProdutc.innerHTML = name
    tdForQuantity.innerHTML = quantity
    tdForPrice.innerHTML = totalPrice.toFixed(2)
    tdForDeleteIcon.appendChild(icon)

    for (var i=0; i<dataCells.length; i++){
        newTableRow.appendChild(dataCells[i])
    }

    table.appendChild(newTableRow)
}

function showTotalChart(){
    total = products.reduce((acum, producto) => acum + producto.totalPrice, 0)
    showTotal.innerHTML = total.toFixed(2)
}

function removeProduct(id){
    let rowToBeDeleetd = document.getElementById(`row${id}`)
    let filtro = products.filter( product => product.id !== id)
    
    products = filtro
    console.log(products)
    showTotalChart()
    rowToBeDeleetd.remove()
}

function checkTrueValue(inputid){

    if(inputid !== 0){
        let input = Number(inputs[inputid].value)
        if(!input){
            inputs[inputid].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        } else {
            inputs[inputid].style.borderBottom = `${borderWidth}px solid ${okColor}`
        }
    } else {
        if(!inputs[inputid].value){
            inputs[inputid].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        } else {
            inputs[inputid].style.borderBottom = `${borderWidth}px solid ${okColor}`
        }
    }
}

function openDiscount(){    
    let valorInputPrecio = Number(inputs[2].value)

    if(valorInputPrecio){
        modal.style.display = 'flex'
    } else {
        inputs[2].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
    }
}

function applyDiscount(){    
    let discount = Number(inputs[3].value)
    
    if(!discount){
        inputs[3].style.borderBottom = `${borderWidth}px solid ${wrongColor}`
        return false
    }

    // 30 - 0.7
    discount = Math.abs((discount/100)-1)
    inputs[2].value = (inputs[2].value * discount).toFixed(2) 

    inputs[3].style.borderBottom = `${borderWidth}px solid white`
    inputs[3].value = ''
    modal.style.display = 'none'
}

function closeDiscount(){
    modal.style.display = 'none'
}

function openDeleteModal(){
    const modal = document.getElementById('delete')
    modal.style.display = 'flex'
}

function closeDeleteModal(){
    const modal = document.getElementById('delete')
    modal.style.display = 'none'
}

function deleteAllProducts(){
    document.location.reload()
}