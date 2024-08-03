const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let rooms = {};

wss.on('connection', (ws) => {
    console.log('New client connected');
    
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        switch (data.type) {

            case 'join-room':
                console.log(rooms);
                if (rooms[data.room]) {
                    rooms[data.room].push(ws);
                    ws.room = data.room;
                    ws.playerNumber = rooms[data.room].length;
                    ws.send(JSON.stringify({ type: 'joined-room', room: data.room, playerNumber: ws.playerNumber }));
                    broadcastToRoom(data.room, { type: 'new-user', message: `Player ${ws.playerNumber} has joined the room.`, playerNumber: ws.playerNumber });
                } else {
                    console.log(rooms)
                    ws.send(JSON.stringify({ type: 'room-error', message: 'Room does not exist!' }));
                }
                break;

            case 'create-room':
                const newRoom = data.room;
                rooms[newRoom] = [ws];
                ws.room = newRoom;
                ws.playerNumber = 1;
                // console.log(rooms[newRoom])
                ws.send(JSON.stringify({ type: 'joined-room', room: newRoom, playerNumber: ws.playerNumber }));
                break;

            case 'color':
                if (ws.room) {
                    broadcastToRoom(ws.room, { type: 'color', color: data.color });
                }
                break;

            case 'update-array':
                if (ws.room) {
                    broadcastToRoom(ws.room, { type: 'update-array', array: data.array });
                }
                break;

            case 'game-over':
                if (ws.room) {
                    broadcastToRoom(ws.room, { type: 'game-over' });
                }
                break;

            case 'new-round':
                if (ws.room) {
                    broadcastToRoom(ws.room, { type: 'new-round', sequence: data.sequence, score: data.score });
                }
                break;
        }
    });

    ws.on('close', () => {
        if (ws.room) {
            rooms[ws.room] = rooms[ws.room].filter(client => client !== ws);
            if (rooms[ws.room].length === 0) {
                delete rooms[ws.room];
            }
        }
        console.log('Client disconnected');
    });
});

function broadcastToRoom(room, data) {
    rooms[room].forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

app.use(express.static(path.join(__dirname)));

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
