const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modList = document.getElementById('modList');
const status = document.getElementById('status');

// GitHub API URL for searching repositories
const GITHUB_API_URL = 'https://api.github.com/search/repositories';

// Search for mods
searchButton.addEventListener('click', async () => {
    const query = searchInput.value.trim();
    if (!query) {
        status.textContent = 'Please enter a search term.';
        return;
    }

    status.textContent = 'Searching for mods...';
    modList.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch(`${GITHUB_API_URL}?q=${query}+gorilla-tag+mod`);
        const data = await response.json();

        if (data.items && data.items.length > 0) {
            data.items.forEach(mod => {
                const modItem = document.createElement('div');
                modItem.className = 'mod-item';

                modItem.innerHTML = `
                    <div>
                        <strong>${mod.name}</strong><br>
                        <span>By ${mod.owner.login}</span>
                    </div>
                    <button onclick="downloadMod('${mod.html_url}')">Download</button>
                `;

                modList.appendChild(modItem);
            });
            status.textContent = `Found ${data.items.length} mod(s).`;
        } else {
            status.textContent = 'No mods found.';
        }
    } catch (error) {
        status.textContent = 'Error searching for mods.';
        console.error(error);
    }
});

// Download mod
function downloadMod(url) {
    status.textContent = 'Downloading mod...';
    window.open(url, '_blank');
    status.textContent = 'Download started. Check your browser downloads.';
}
