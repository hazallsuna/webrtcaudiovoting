const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let votes = { yes: 0, no: 0, maybe: 0 };
let voteHistory = [];

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    //mevcur oy ve yeni bağlantıyı clienta gönder
    socket.on('requestVotes', () => {
        socket.emit('updateVote', { votes, voteHistory });
    });
     //oyları yönet
     socket.on('vote', (vote) => {
        if (votes[vote] !== undefined) {
            votes[vote]++;
            voteHistory.push({ option: vote, time: new Date() });
            io.emit('updateVote', { votes, voteHistory });
        }
    });

    //oyları sıfırla
    socket.on('resetVotes', () => {
        votes = { yes: 0, no: 0, maybe: 0 };
        voteHistory = [];
        io.emit('updateVote', { votes, voteHistory });
    });

    // webrtc sinyal iletimi
    socket.on('signal', (message) => {
        socket.broadcast.emit('signal', message);
    });

    // Kullanıcı bağlantısı kesildiğinde
    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});