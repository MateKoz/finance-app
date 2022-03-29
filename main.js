const incomeSection = document.querySelector(`.income-area`)
const expensesSection = document.querySelector(`.expenses-area`)
const availableMoney = document.querySelector(`.available-money`)
const addTransactionPanel = document.querySelector(`.add-transaction-panel`)

const nameInput = document.querySelector(`#name`)
const amountInput = document.querySelector(`#amount`)
const categorySelect = document.querySelector(`#category`)

const addTransactionBtn = document.querySelector(`.add-transaction`)
const saveBtn = document.querySelector(`.save`)
const cancelBtn = document.querySelector(`.cancel`)
const deleteBtn = document.querySelector(`.delete`)
const deleteAllBtn = document.querySelector(`.delete-all`);

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArray = [0]