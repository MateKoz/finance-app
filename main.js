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
const deleteAllBtn = document.querySelector(`.delete-all`);


let root = document.documentElement;
let ID = 0;
let categoryIcon;
let moneyArray = [0]


//funkcja pokazujaca nam panel transakcji po nacisnieciu btn 'Dodaj transakcje'.
const showPanel = () => {
    addTransactionPanel.style.display = 'flex';
}

//Funkcja zamykajaca panel transakcji i przypisujaca puste wartości do inputow i selecta.
const cancelPanel = () => {
    addTransactionPanel.style.display = 'none';
    nameInput.value = '';
    amountInput.value = '';
    categorySelect.value = 'none'
}

//Funkcja sprawdza, czy wszystkie wartosci zostaly uzupelnione, jesli nie, informuje nas w formie alerta.
const checkForm = () => {
    if (nameInput.value !== '' && amountInput.value !== '' && categorySelect.value !== 'none') {
        createNewTransaction();
        cancelPanel();
    } else {
        alert(`Wypełnij wszystkie pola!`)
    }
}

//Tworzymy nowego diva i przypisujemy mu klase 'transaction' oraz dodajemy atrybut id.
const createNewTransaction = () => {
    checkCategory();
    const newTransaction = document.createElement('div')
    newTransaction.classList.add('transaction');
    newTransaction.setAttribute('id', ID);

    newTransaction.innerHTML = `
    <p class="transaction-name">${categoryIcon} ${nameInput.value}</p>
    <p class="transaction-amount">${amountInput.value} zł.
    <button class="delete" onclick="deleteTransaction(${ID})"><i class="fas fa-times"></i></button></p>`

    amountInput.value > 0 ? incomeSection.appendChild(newTransaction) && newTransaction.classList.add(`income`)
        : expensesSection.appendChild(newTransaction) && newTransaction.classList.add(`expense`);

    moneyArray.push(parseFloat(amountInput.value))
    cancelPanel()
    ID++
    countMoney()
}

//Zliczamy elementy w tablicy za pomoca reduce, nastepnie przypisujemy wynik do sumArray.
const countMoney = () => {
    const sumArray = moneyArray.reduce((prev, curr) => {
        return prev + curr
    })

    if (sumArray >= 1) {
        availableMoney.style.color = 'green'
    } else if(sumArray < 0) {
        availableMoney.style.color = 'red'
    } else {
        availableMoney.style.color = 'black'
    }
    availableMoney.textContent = `${sumArray}zł`
}

//Funkcja przypisujaca ikony w zaleznosci od wybranej opcji w selectcie
const checkCategory = () => {
    if (categorySelect.value === 'income') {
        categoryIcon = `<i class="fas fa-money-bill-wave"></i>`
    } else if (categorySelect.value === 'shopping') {
        categoryIcon = `<i class="fas fa-cart-arrow-down"></i>`;
    } else if (categorySelect.value === 'food') {
        categoryIcon = `<i class="fas fa-hamburger"></i>`;
    } else if (categorySelect.value === 'cinema') {
        categoryIcon = `<i class="fas fa-film"></i>`;
    } else if (categorySelect.value === 'another') {
        categoryIcon = `<i class="fa-solid fa-money-check-dollar"></i>`
    }
}
//usuwamy konkretna transakcje i uwzgledniamy to w sumArray oraz w tablicy moneyArray
const deleteTransaction = id => {
    const transactionToDelete = document.getElementById(id)
    const transactionAmount = parseFloat(transactionToDelete.childNodes[3].innerText);
    const indexOfTransaction = moneyArray.indexOf(transactionAmount);

    transactionToDelete.classList.contains(`income`) ? incomeSection.removeChild(transactionToDelete)
        : expensesSection.removeChild(transactionToDelete)

    moneyArray.splice(indexOfTransaction, 1);
    countMoney()
}

//Czyści naszą cała liste transakcji
const deleteAllTransaction = () => {
    incomeSection.innerHTML = '<h3>Przychód:</h3>';
    expensesSection.innerHTML = '<h3>Wydatki:</h3>';
    moneyArray = [0]
    availableMoney.textContent = `0zł`;
}

//zmienia styl na light (funkcje sa wywolane metoda onclick w HTML)
const changeStyleToLight = () => {
    root.style.setProperty(`--first-color`, '#F9F9F9');
    root.style.setProperty(`--second-color`, '#14161F');
    root.style.setProperty(`--border-color`, 'rgba(0, 0, 0, .2)');
    availableMoney.style.color = `black`;

}

//zmienia styl na dark (funkcje sa wywolane metoda onclick w HTML)
const changeStyleToDark = () => {
    root.style.setProperty(`--first-color`, '#14161F');
    root.style.setProperty(`--second-color`, '#F9F9F9');
    root.style.setProperty(`--border-color`, 'rgb(255,255,255)');
    availableMoney.style.color = `white`;
}

//Nasluchiwanie na element.
deleteAllBtn.addEventListener('click', deleteAllTransaction)
addTransactionBtn.addEventListener('click', showPanel)
cancelBtn.addEventListener('click', cancelPanel)
saveBtn.addEventListener('click', checkForm);