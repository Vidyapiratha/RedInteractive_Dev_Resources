document.addEventListener('DOMContentLoaded', function () {
    const socket = io();

    socket.on('pageContentUpdated', ({amount, description}) => {
        document.getElementById('amount').innerText = `$ ${amount.toLocaleString('en-US')}`;
        document.getElementById('description').innerText = description;
    });
    fetch('/api/page')
        .then(response => response.json())
        .then(({title, description, buttonLabel}) => {
            document.getElementById('title').innerText = title;
            document.getElementById('description').innerText = description;
        })
        .catch(error => console.error('Error fetching data:', error));
});