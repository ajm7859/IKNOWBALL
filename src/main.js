// window.onload = () => {
//     document.querySelector("#searchButton").addEventListener("click", () => {
//         const playerName = document.querySelector("#playerInput").value.trim();
//         if (playerName) {
//             searchPlayerID(playerName);
//         }
//     });
// };

// const searchPlayerID = (playerName) => {
//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.onload = (e) => {
//         try {
//             const json = JSON.parse(e.target.responseText);
//             console.log("API Response:", json); // Log the entire API response for inspection

//             // Check if the response contains an error or unexpected data
//             if (json.statusCode !== 200) {
//                 console.error("API Error: Response status code is not 200");
//                 return;  // Exit if the response status is not 200
//             }

//             // Check if the body exists and is an array
//             if (Array.isArray(json.body)) {
//                 console.log("Players List:", json.body); // Log the player list to inspect the structure

//                 // Find the player by longName (case insensitive)
//                 const foundPlayer = json.body.find(player => player.longName.toLowerCase() === playerName.toLowerCase());

//                 if (foundPlayer) {
//                     console.log(`Found Player: ${foundPlayer.longName} (ID: ${foundPlayer.playerID})`);
//                     loadPlayerStats(foundPlayer.playerID);
//                 } else {
//                     console.log(`Player "${playerName}" not found.`);
//                 }
//             } else {
//                 console.log("No valid players found in the response body.");
//             }
//         } catch (error) {
//             console.error("Error parsing player list response:", error);
//         }
//     };

//     xhr.open('GET', 'https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBPlayerList');
//     xhr.setRequestHeader('x-rapidapi-key', 'a7023f77bbmshf894ddb575c6a1fp15a8c8jsn3ca7ae5b831d');
//     xhr.setRequestHeader('x-rapidapi-host', 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com');

//     xhr.send();
// };




// const loadPlayerStats = (playerID) => {
//     const xhr = new XMLHttpRequest();
//     xhr.withCredentials = true;

//     xhr.onload = (e) => {
//         try {
//             const json = JSON.parse(e.target.responseText);
//             console.log(`Stats for Player ID: ${playerID}`);

//             if (json.body.splits) {
//                 for (const split in json.body.splits) {
//                     console.log(`${split} AVG: ${json.body.splits[split].AVG || "N/A"}`);
//                     console.log(`${split} OPS: ${json.body.splits[split].OPS || "N/A"}`);
//                 }
//             }
//         } catch (error) {
//             console.error("Error parsing player stats response:", error);
//         }
//     };

//     xhr.open('GET', `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBSplits?playerID=${playerID}&splitType=batting&season=2023`);
//     xhr.setRequestHeader('x-rapidapi-key', 'a7023f77bbmshf894ddb575c6a1fp15a8c8jsn3ca7ae5b831d');
//     xhr.setRequestHeader('x-rapidapi-host', 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com');

//     xhr.send();
// };
const teamAbbreviations = [
    "CHW", "NYY", "LAD", "BOS", "HOU", "SF", "STL", "ATL", "SD", "TOR", "MIN", "PHI", "SEA", "MIL", "CIN", "TB", "BAL", "OAK", "DET", "CLE", "MIA", "KC", "PIT", "TEX", "NYM", "COL", "LAA", "WAS", "CHC", "ARI"
];

const fetchTeamRoster = (teamAbv) => {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.onload = (e) => {
        try {
            const json = JSON.parse(e.target.responseText);
            console.log(`Roster for team ${teamAbv}:`, json); // Log the response for inspection

            if (json.statusCode === 200 && json.body) {
                console.log(`Fetched roster for team ${teamAbv}`);
                // Here you can handle the fetched data, e.g., display it on the UI or store it in a list
            } else {
                console.log(`Failed to fetch roster for team ${teamAbv}`);
            }
        } catch (error) {
            console.error(`Error fetching roster for team ${teamAbv}:`, error);
        }
    };

    xhr.open('GET', `https://tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com/getMLBTeamRoster?teamAbv=${teamAbv}&getStats=true&fantasyPoints=true&battingR=1&battingTB=1&battingRBI=1&battingBB=1&battingSO=-1&baseRunningSB=1&pitchingIP=3&pitchingH=-1&pitchingER=-2&pitchingBB=-1&pitchingSO=1&pitchingW=2&pitchingL=-2&pitchingHold=2&pitchingSave=2`);
    xhr.setRequestHeader('x-rapidapi-key', 'a7023f77bbmshf894ddb575c6a1fp15a8c8jsn3ca7ae5b831d');
    xhr.setRequestHeader('x-rapidapi-host', 'tank01-mlb-live-in-game-real-time-statistics.p.rapidapi.com');

    xhr.send();
};

const fetchAllTeamRosters = () => {
    teamAbbreviations.forEach(teamAbv => {
        fetchTeamRoster(teamAbv);
    });
};

// Call this function to start fetching rosters for all teams
window.onload = () => {
    fetchAllTeamRosters();
}
