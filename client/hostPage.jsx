import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';

const socket = io();

const HostPage = () => {
    const [players, setPlayers] = useState([]);
    const [gameStats, updateGame] = useState({});
    const [gameStarted, setGameStarted] = useState(false); // Track if the game has started


    useEffect(() => {
        // Listen for the 'game started' event
        socket.on('game started', () => {
            console.log('Game has started');
            setGameStarted(true); // Update the state to indicate the game has started
        });

        // Listen for the 'update player list' event
        socket.on('update player list', (playerList) => {
            console.log('update player list');
            setPlayers(playerList);
        });

        // Cleanup listeners on component unmount
        return () => {
            socket.off('game started');
            socket.off('update player list');
        };
    }, []);

    // Register the socket listener when the component mounts
    socket.on('update player list', (playerList) => {
        console.log('update player list');
        setPlayers(playerList);
    });

    const handleStartGame = () => {
        // Emit the 'start game' event to the server
        socket.emit('start game', 'The game has started!');
    };

    return (

        <div id='home-content'>
            <div className="baseball-banner">
                {Array.from({ length: 10 }).map((_, index) => (
                    <img key={index} src="assets/img/baseball.png" className="baseball" style={{ animationDelay: `${index * 0.5}s` }} alt="Baseball" />
                ))}
            </div>
            <img src="assets/img/IKNOWBALL-LOGO-T.png" alt="IKNOWBALL" width="640px" height="480px"></img>
            <h2>Game Code: 1234</h2>
            <button
                onClick={handleStartGame}
                className="btn btn-primary"
                disabled={gameStarted}
            >
                {gameStarted ? 'Game Started' : 'Start Game'}
            </button>
            <ul id='player-list'>
                {Object.values(players).map((player) => (
                    <li key={player.id}>{player.name + " - Score: " + player.totalScore + " " /*+ player.id*/}</li>
                ))}
            </ul>
        </div>
    );
};

const init = () => {
    
    socket.emit('get player count', () => {});
    const root = createRoot(document.getElementById('host-content'));

    root.render(
        <HostPage />
    );
};

window.onload = init;