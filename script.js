const balance = document.getElementById('balance')
const moneyPlus = document.getElementById('money-plus')
const moneyMinus = document.getElementById('money-minus')
const list = document.getElementById('list')
const form = document.getElementById('form')
const text = document.getElementById('text')
const amount = document.getElementById('amount')

const getTransactionFromLocalStorage = JSON.parse(
  localStorage.getItem('transactions')
)

let transactions = localStorage.getItem('transactions')
  ? getTransactionFromLocalStorage
  : []

console.log(transactions)

function generateID() {
  return Math.floor(Math.random() * 100000000)
}

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? '-' : '+'
  const item = document.createElement('li')

  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus')

  item.innerHTML = `
  ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span>
  <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">X</button>
  `

  list.appendChild(item)
}

function updateValues() {
  console.log(transactions)
  const amounts = transactions.map(transaction => transaction.amount)
  console.log(amounts)
  const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(3)

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => acc + item, 0)
    .toFixed(2)

  const expense =
    amounts.filter(item => item < 0).reduce((acc, item) => acc + item, 0) *
    -(1).toFixed(2)

  balance.innerHTML = `$${total}`
  moneyPlus.innerHTML = `$${income}`
  moneyMinus.innerHTML = `$${expense}`
}

function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions))
}

function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id)
  updateLocalStorage()
  init()
}

function init() {
  list.innerHTML = ''
  transactions.forEach(addTransactionDOM)
  updateValues()
}

init()

function addTransaction(e) {
  e.preventDefault()

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and an amount')
    return
  }

  const transaction = {
    id: generateID(),
    text: text.value,
    amount: +amount.value,
  }

  transactions.push(transaction)
  addTransactionDOM(transaction)
  updateValues()
  updateLocalStorage()

  text.value = ''
  amount.value = ''
}

form.addEventListener('submit', addTransaction)