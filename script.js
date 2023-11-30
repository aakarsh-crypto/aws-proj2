const expenseForm = document.getElementById('finance-form');
const expenseTable = document.getElementById('expense-table');

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const expenseDate = document.getElementById('expense-date').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const expenseCategory = document.getElementById('expense-category').value;

  const newExpense = {
    date: expenseDate,
    amount: expenseAmount,
    category: expenseCategory
  };

  // Store expense data in localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(newExpense);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Update expense table
  updateExpenseTable();

  // Clear form fields
  expenseForm.reset();
});

function removeExpense(removeButton) {
  const expenseRow = removeButton.parentElement.parentElement;
  const expenseIndex = expenseRow.rowIndex - 1; // Subtract 1 for table header row

  // Remove expense data from localStorage
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.splice(expenseIndex, 1);
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Remove expense row from table
  expenseTable.removeChild(expenseRow);
}

function updateExpenseTable() {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Clear existing table rows
  expenseTable.innerHTML = '';

  // Add new table rows for each expense
  expenses.forEach((expense, index) => {
    const newExpenseRow = document.createElement('tr');
    newExpenseRow.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.amount}</td>
      <td>${expense.category}</td>
      <td>
        <button onclick="removeExpense(this)">Remove</button>
      </td>
    `;

    expenseTable.appendChild(newExpenseRow);
  });
}

// Load initial expenses from localStorage and update table
updateExpenseTable();
