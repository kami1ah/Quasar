async function displayLeaderboard() {
    const leaderboardContainer = document.querySelector("#leaderboard tbody");
    try {

        const response = await fetch('/stats')

        if (!response.ok) {
            throw new Error("Failed to fetch leaderboard");
        }
        
        const data = await response.json();
        console.log(data);
        leaderboardContainer.innerHTML = "";
        
        data.forEach((item, index) => {
            const tr = leaderboardContainer.insertRow();
            const tc0 = tr.insertCell();
            const tc1 = tr.insertCell();
            const tc2 = tr.insertCell();
            const tc3 = tr.insertCell();
            
            tc0.textContent = index + 1; 
            tc1.textContent = item.username;  
            tc2.textContent = item.total_points; 
            tc3.textContent = item.total_games; 

        });

    } catch (err) {
        console.error("Error loading leaderboard:", err)
    }
}

displayLeaderboard();


