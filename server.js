const express = require('express');
const path = require('path');
const socket = require('socket.io');

const app = express();

//Dodatkowo pamiętaj, że nasza aplikacja korzysta też z plików zewnętrznych (style.css oraz app.js), musimy więc dodać middleware, który pozwoli na ich udostępnianie przez serwer. Nie musisz robić pojedynczych endpointów do ich obsługi. Wystarczy, że użyjesz wbudowany middleware express.static
app.use(express.static(path.join(__dirname, '/client'))); // - static - wez wszystko cokolwiek jest w folderze client i serwuj pliki statyczne na naszym serwerze
app.use(express.urlencoded({extended: false})); //Jeśli chcesz umożliwić obsługę formularzy x-www-form-urlencoded, dodaj middleware express.urlencoded.
app.use(express.json()); //Jeśli dodatkowo chcesz odbierać dane w formacie JSON (mogą być wysyłane za pomocą form-data), to również express.json:

const users = [];
const messages = [];

//Dodaj funkcjonalność pokazywania aplikacji umieszczonej w /client pod głównym linkiem
app.get('*', (req, res) => { //*-gwiazdka oznacza 'wszystko'
    res.sendFile(path.join(__dirname, '/client/index.html')); //Musisz stworzyć endpoint wyłapujący wszystkie linki i renderujący plik index.html z ./client.
});
/* app.use((req, res) => {
    res.status(404).render('404.html', {layout: false});
}) */

const server = app.listen(8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New client! Its id – ' + socket.id);
    socket.on('message', (message) => {
        console.log('Oh, I\'ve got something from ' + socket.id);
        messages.push(message);
        socket.broadcast.emit('message', message); });

    socket.on('join', (user) => {
        users.push(user);
        console.log(user.user);
        console.log('Oh, I\'ve added new socket ' + socket.id + ' to my list of users')
        socket.broadcast.emit('join', user);
    });

    socket.on('disconnect', () => {
        users.forEach(user => {
            if(user.id === socket.id){
                const index = users.indexOf(user);
                socket.broadcast.emit('removeUser', user);
                users.splice(index, 1);
            }
        });
        console.log('Oh, socket ' + socket.id + ' has left')
    });
    console.log('I\'ve added a listener on message and disconnect events \n');
});