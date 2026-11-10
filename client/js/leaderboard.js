async function displayLeaderboard() {
    const leaderboardContainer = document.getElementById("leaderboard");
    try {
        const response = await fetch("http://localhost:3000/api/leaderboard");

        if (!response.ok) {
            throw new Error("Failed to fetch leaderboard");
        }
        
        const data = await response.json();
        const table = document.createElement("table");
        
        data.forEach((item, index) => {
            const tr = table.insertRow();
            const tc0 = tr.insertCell();
            const tc1 = tr.insertCell();
            const tc2 = tr.insertCell();
            
            tc1.textContent = index + 1; 
            tc1.textContent = item.name;  
            tc2.textContent = item.score; 
        });

        leaderboardContainer.appendChild(table);

    } catch (err) {
        console.error("Error loading leaderboard:", err)
    }
}

