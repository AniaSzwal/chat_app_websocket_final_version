const loginForm = document.querySelector('#welcome-form');
const messagesSection =document.querySelector('#messages-section');
const messagesList = messagesSection.querySelector('#messages-list');
const addMessageForm = messagesSection.querySelector('#add-messages-form');
const userNameInput = loginForm.querySelector('#username');
const messageContentInput = addMessageForm.querySelector('#message-content');

let userName = '';

//Dodaj nasłuchiwacz na ten formularz. Po wykryciu zdarzenia submit odpala się funkcja login. Funkcja ta przyjmuje inf o evencie oraz blokujr domyślne zachowanie przeglądarki (preventDefault)
const login = (event) => {
    event.preventDefault();
//Dodaj walidację wartości userNameInput. (dodaj za userNameInput końcówkę .value - bo walidacja 'wartości').
// Ma sprawdzać, czy pole nie jest puste. Jeśli tak, należy zwrócić komunikat o błędzie (wystarczy zwykły alert)
    if (userNameInput.value === userName) {
        alert('Please enter Your login')
//Gdy wszystko w porządku, nasz kod powinien przypisać wartość tego pola do zmiennej userName
    } else {
        userName = userNameInput.value;
//schować formularz logowania
        loginForm.classList.remove('show');
//pokazać sekcję wiadomości
        messagesSection.classList.add('show');
    }
}

loginForm.addEventListener('submit', login);

//Co do funkcji addMessage, na razie ma przyjmować informację o autorze wiadomości oraz jej treści i generować odpowiedni kod HTML, czyli po prostu dodać nowy element li do naszej listy z wiadomościami. Musi przy tym zachować odpowiedni format (nagłówek to autor, treść ma być w divie o klasie .message itd.).
function addMessage(author, content) {
    const message = document.createElement('li');
    message.classList.add('message');
    author === userName ? message.classList.add('message--self') : message.classList.add('message--recieved');
    message.innerHTML =
        `<h3 class="message__author">${userName === author ? 'You' : author }</h3>
        <div class="message__content">
            ${content}
        </div>`;
    messagesList.appendChild(message);
}

const sendMessage = (event) => {
    event.preventDefault();
    if (messageContentInput.value === '') {
    alert('Please type Your message');

//Gdy wszystko jest w porządku, wywołaj funkcję addMessage, a jako argument przekaż jej wartość userName, oraz wpisaną treść #messageContentInput
    }else {
        addMessage(userName, messageContentInput.value)
    }
}
addMessageForm.addEventListener('submit', sendMessage)