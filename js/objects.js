var table = document.getElementById('tabla')
var inputs = document.getElementsByTagName('input')
var showTotal = document.getElementById('total')
var rows = document.getElementsByTagName('tr')

var products = []
// var productsPrices = [0]
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

    let newProduct = new Product(acum, productName, productQuantity, pricePerUnit)

    products.push(newProduct)
    // productsPrices.push(newProduct.totalPrice)
    // console.log(productsPrices)
    acum++

    createNewTableRow(newProduct)

    clearInputs()
    showTotalChart(newProduct.totalPrice)
}

function clearInputs(){
    for(var i=0; i<inputs.length; i++){
        inputs[i].value = ''
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
    icon.classList.add('fa-trash-alt')
    icon.onclick = () => {
        removeProduct(totalPrice, id)
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

function showTotalChart(productPrice){
    total += productPrice
    showTotal.innerHTML = total
}

function removeProduct(productPrice, id){
    let rowToBeDeleetd = document.getElementById(`row${id}`)
    total -= productPrice
    showTotal.innerHTML = total
    rowToBeDeleetd.remove()

}