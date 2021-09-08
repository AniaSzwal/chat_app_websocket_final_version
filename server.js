const express = require('express');
const path = require('path');

const app = express();

//Dodatkowo pamiętaj, że nasza aplikacja korzysta też z plików zewnętrznych (style.css oraz app.js), musimy więc dodać middleware, który pozwoli na ich udostępnianie przez serwer. Nie musisz robić pojedynczych endpointów do ich obsługi. Wystarczy, że użyjesz wbudowany middleware express.static
app.use(express.static(path.join(__dirname, '/client'))); // - static - wez wszystko cokolwiek jest w folderze client i serwuj pliki statyczne na naszym serwerze
app.use(express.urlencoded({extended: false})); //Jeśli chcesz umożliwić obsługę formularzy x-www-form-urlencoded, dodaj middleware express.urlencoded.
app.use(express.json()); //Jeśli dodatkowo chcesz odbierać dane w formacie JSON (mogą być wysyłane za pomocą form-data), to również express.json:

const messages = [];

//Dodaj funkcjonalność pokazywania aplikacji umieszczonej w /client pod głównym linkiem
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/index.html')); //Musisz stworzyć endpoint wyłapujący wszystkie linki i renderujący plik index.html z ./client.
});
app.use((req, res) => {
    res.status(404).render('404.html', {layout: false});
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});