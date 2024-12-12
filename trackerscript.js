document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list").getElementsByTagName('tbody')[0];
    const totalAmount = document.getElementById("total-amount");
    const filterCategory = document.getElementById("filter-category");
    const filterMonth = document.getElementById("filter-month");
    const sortDropdown = document.getElementById("sort-expenses");
    const exportButton = document.getElementById("export-csv");
    const darkModeToggle = document.getElementById("dark-mode-toggle");
    
    let expenses = [];

    // Handle form submission
    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("expense-name").value;
        const amount = parseFloat(document.getElementById("expense-amount").value);
        const category = document.getElementById("expense-category").value;
        const date = document.getElementById("expense-date").value;

        if (!name || isNaN(amount) || !category || !date) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const expense = {
            id: Date.now(),
            name,
            amount,
            category,
            date: formatDate(date), 
        };

        expenses.push(expense);
        displayExpenses(expenses);
        updateTotalAmount();
        saveToLocalStorage();

        expenseForm.reset();
    });

    expenseList.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const id = parseInt(e.target.dataset.id);
            const row = e.target.closest("tr");
            const confirmed = confirm("Tem certeza que deseja excluir esta despesa?");
            
            if (confirmed) {
                row.classList.add("fade-out"); 
                setTimeout(() => {
                    expenses = expenses.filter(expense => expense.id !== id);
                    displayExpenses(expenses);
                    updateTotalAmount();
                    saveToLocalStorage();
                }, 500); 
            }
        } else if (e.target.classList.contains("edit-btn")) {
            const id = parseInt(e.target.dataset.id);
            const expense = expenses.find(expense => expense.id === id);

            if (expense) {
                document.getElementById("expense-name").value = expense.name;
                document.getElementById("expense-amount").value = expense.amount;
                document.getElementById("expense-category").value = expense.category;
                document.getElementById("expense-date").value = expense.date;

                expenses = expenses.filter(exp => exp.id !== id); 
                displayExpenses(expenses);
                updateTotalAmount();
            }
        }
    });

    filterCategory.addEventListener("change", (e) => {
        const category = e.target.value;
        if (category === "All") {
            displayExpenses(expenses);
        } else {
            const filteredExpenses = expenses.filter(expense => expense.category === category);
            displayExpenses(filteredExpenses);
        }
    });

    filterMonth.addEventListener("change", (e) => {
        const month = e.target.value;
        const filteredExpenses = month === "All" ? expenses : expenses.filter(expense => expense.date.split("/")[1] === month);
        displayExpenses(filteredExpenses);
    });

    sortDropdown.addEventListener("change", (e) => {
        const criteria = e.target.value;
        sortExpenses(criteria);
    });

    function saveToLocalStorage() {
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    function loadFromLocalStorage() {
        const savedExpenses = JSON.parse(localStorage.getItem("expenses"));
        if (savedExpenses) {
            expenses = savedExpenses;
            displayExpenses(expenses);
            updateTotalAmount();
        }
    }


    exportButton.addEventListener("click", exportToCSV);

    function exportToCSV() {
        const csvRows = [];
        const headers = ["Nome", "Valor", "Categoria", "Data"];
        csvRows.push(headers.join(","));

        expenses.forEach(expense => {
            const row = [expense.name, expense.amount.toFixed(2), expense.category, expense.date].join(",");
            csvRows.push(row);
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "despesas.csv";
        link.click();
    }

    function sortExpenses(criteria) {
        let sortedExpenses;
        if (criteria === "name") {
            sortedExpenses = [...expenses].sort((a, b) => a.name.localeCompare(b.name));
        } else if (criteria === "amount") {
            sortedExpenses = [...expenses].sort((a, b) => a.amount - b.amount);
        } else if (criteria === "date") {
            sortedExpenses = [...expenses].sort((a, b) => new Date(a.date.split("/").reverse().join("-")) - new Date(b.date.split("/").reverse().join("-")));
        }
        displayExpenses(sortedExpenses);
    }

    function displayExpenses(expenses) {
        expenseList.innerHTML = "";
        expenses.forEach(expense => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${expense.name}</td>
                <td>R$ ${expense.amount.toFixed(2)}</td>
                <td>${expense.category}</td>
                <td>${expense.date}</td>
                <td>
                    <button class="edit-btn" data-id="${expense.id}">Editar</button>
                    <button class="delete-btn" data-id="${expense.id}">Excluir</button>
                </td>
            `;
            row.classList.add("fade-in");
            expenseList.appendChild(row);
        });
    }

    function updateTotalAmount() {
        const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
        totalAmount.textContent = total.toFixed(2);
    }

    function formatDate(date) {
        const [year, month, day] = date.split("-");
        return `${day}/${month}/${year}`;
    }

    darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    loadFromLocalStorage();

    const style = document.createElement("style");
    style.innerHTML = `
        .fade-out {
            opacity: 0;
            transition: opacity 0.5s ease-out;
        }
        .fade-in {
            opacity: 1;
            transition: opacity 0.5s ease-in;
        }
        .dark-mode {
            background-color: #121212;
            color: white;
        }
        .dark-mode button {
            background-color: #333;
            color: white;
        }
    `;
    document.head.appendChild(style);
});


(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var name = $('.validate-input input[name="name"]');
    var email = $('.validate-input input[name="email"]');
    var subject = $('.validate-input input[name="subject"]');
    var message = $('.validate-input textarea[name="message"]');


    $('.validate-form').on('submit',function(){
        var check = true;

        if($(name).val().trim() == ''){
            showValidate(name);
            check=false;
        }

        if($(subject).val().trim() == ''){
            showValidate(subject);
            check=false;
        }


        if($(email).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
            showValidate(email);
            check=false;
        }

        if($(message).val().trim() == ''){
            showValidate(message);
            check=false;
        }

        return check;
    });


    $('.validate-form .input1').each(function(){
        $(this).focus(function(){
           hideValidate(this);
       });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);