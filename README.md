# simon-mario-game
![image](https://github.com/user-attachments/assets/41b693ca-3722-4771-988f-b3b874363db9)
![image](https://github.com/user-attachments/assets/92da1b37-5efd-4480-b0bd-61eb1d725548)
![image](https://github.com/user-attachments/assets/ffd22673-c17b-4fe2-b199-efb2b8e4810f)

# Simon Game

## Overview

Simon Game is a web-based memory game where players must repeat a sequence of colors and sounds in the correct order. The game supports multiplayer functionality using WebSockets, allowing players to join or create rooms and compete in real-time.

## Features

- Multiplayer functionality with room-based game sessions.
- Real-time synchronization of game states between clients.
- Audio-visual feedback for game actions.
- Score tracking for each game session.

## Technologies Used

- HTML, CSS, and JavaScript for the frontend.
- jQuery for DOM manipulation.
- WebSocket for real-time communication.
- Node.js with Express for the backend server.

## Getting Started

### Prerequisites

- Node.js installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/simon-game.git
cd simon-game
```

2. Install the necessary dependencies:

```bash
npm install
```

### Running the Server

Start the server using the following command:

```bash
node server.js
```

The server will start running on `http://localhost:8080`.

### Running the Game

1. Open your browser and navigate to `http://localhost:8080`.
2. You can create a new room or join an existing room to start playing the game.

## Folder Structure

- `server.js`: Backend server code handling WebSocket connections and game logic.
- `index.html`: Main HTML file for the game interface.
- `game.html`: HTML file for the game room interface.
- `styles.css`: CSS file for styling the game.
- `scripts1.js`: JavaScript file for the game logic.
- `sounds/`: Directory containing sound files used in the game.

## Gameplay Instructions

1. **Create Room**: Click on "Create Room" to generate a new room code and start a new game session.
2. **Join Room**: Enter an existing room code to join a game session.
3. **Play the Game**: Watch the sequence of colors and repeat it by clicking the corresponding buttons. The sequence will get longer with each round.
4. **Game Over**: If you click the wrong button, the game is over. Your score will be displayed.

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact [your-email@example.com].

---

Enjoy playing the Simon Game!
