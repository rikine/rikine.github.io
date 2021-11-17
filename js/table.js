function change_language() {
    let label_lang = document.querySelector(".label_language")
    let title = document.querySelector(".title")
    let label_max_num_of_tasks = document.querySelector(".max_number_of_days")
    let sbm_button = document.querySelector("#submit")
    let clear_button = document.querySelector("#clear")

    let header_table = get_header_table()
    let russian_header_table = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"]
    let english_header_table = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

    let lang = document.getElementById("language").value;

    switch (lang) {
        case "rus":
            title.innerText = "Составить планы на неделю"
            label_lang.innerText = "Выберите язык расписания:"
            label_max_num_of_tasks.innerText = "Максимальное количество задач в день:"
            sbm_button.innerText = "Отправить"
            clear_button.innerText = "Очистить"

            header_table.forEach((elem, index) => {
                elem.innerText = russian_header_table[index]
            })
            break;
        case "eng":
            title.innerText = "Create plans for a week"
            label_lang.innerText = "Choose language for a schedule:"
            label_max_num_of_tasks.innerText = "Max number of task for a day:"
            sbm_button.innerText = "Send"
            clear_button.innerText = "Clear"

            header_table.forEach((elem, index) => {
                elem.innerText = english_header_table[index]
            })
            break;
        default:
            break;
    }
}

function get_header_table() {
    let monday_th = document.querySelector(".monday");
    let tuesday_th = document.querySelector(".tuesday");
    let wednesday_th = document.querySelector(".wednesday");
    let thursday_th = document.querySelector(".thursday");
    let friday_th = document.querySelector(".friday");
    let saturday_th = document.querySelector(".saturday");
    let sunday_th = document.querySelector(".sunday");

    return [monday_th, tuesday_th, wednesday_th, thursday_th, friday_th, saturday_th, sunday_th]
}

function generate_table() {
    let table = document.querySelector(".table")
    let count = table.childNodes.length
    for(let i = 0; i < count - 2; i++) {
        table.removeChild(table.lastChild)
    }
    let rows = document.getElementById("max_number_of_days").value

    for(let i = 0; i < rows; i++) {
        let tr = document.createElement("tr")
        for (let j = 0; j < 7; j++) {
            let th = document.createElement("th")
            let textarea = document.createElement("textarea")
            textarea.setAttribute("id", `item${i}_${j}`)
            textarea.setAttribute("onchange", "save_data_cell(this)")
            th.appendChild(textarea)
            tr.appendChild(th)
        }
        table.appendChild(tr)
    }
}

function save_params() {
    let count = document.getElementById("max_number_of_days").value;
    let lang = document.getElementById("language").value;

    localStorage.setItem("rows", count);
    localStorage.setItem("lang", lang);
}

function save_data_cell(elem) {
    localStorage.setItem(elem.getAttribute("id"), elem.value)
}

function get_data_cells() {
    let rows = document.getElementById("max_number_of_days").value;
    let col = 7;

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < col; j++) {
            const id = `item${i}_${j}`
            let textarea = document.getElementById(id);
            textarea.value = localStorage.getItem(id)
        }
    }
}

function init() {
    rows = localStorage.getItem("rows");
    lang = localStorage.getItem("lang");

    console.log(rows)

    document.getElementById("max_number_of_days").value = rows;

    let lang_input = document.getElementById("language");
    for (let i = 0; i < lang_input.options.length; i++) {
        const element = lang_input.options[i];
        if (element.value == lang) {
            element.setAttribute("selected", "selected")
            change_language()
            break;
        }
        
    }

    generate_table()
    get_data_cells()
}

function clear_all() {
    localStorage.clear();
    document.getElementById("max_number_of_days").value = 5;
}