const modList = document.getElementById('modList');
const status = document.getElementById('status');

// List of mods with their GitHub raw file URLs
const mods = [
    {
        name: "Stupid Menu",
        id: "stupidmenu",
        downloadUrl: "https://github.com/iiDk-the-actual/iis.Stupid.Menu/releases/download/5.6.0/iis_Stupid_Menu.dll"
    },
    {
        name: "WalkSim",
        id: "walksim",
        downloadUrl: "https://github.com/tfoeisbetter/dllsforuitest/releases/download/1.0.0/WalkSimulator-NonUtilla.dll"
    },
    {
        name: "Gorilla Computer",
        id: "computerinterface",
        downloadUrl: "https://github.com/tfoeisbetter/dllsforuitest/releases/download/1.0.0/GorillaComputer.dll"
    }
];

// Display the list of mods
function displayMods() {
    mods.forEach(mod => {
        const modItem = document.createElement('div');
        modItem.className = 'mod-item';
        modItem.id = mod.id;

        modItem.innerHTML = `
            <div>
                <strong>${mod.name}</strong>
            </div>
            <button onclick="downloadMod('${mod.downloadUrl}', '${mod.name}')">Download</button>
        `;

        modList.appendChild(modItem);
    });
}

// Download mod
function downloadMod(url, modName) {
    status.textContent = `Downloading ${modName}...`;

    // Create a hidden anchor tag to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop(); // Extract the filename from the URL
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    status.textContent = `${modName} downloaded!`;
}

// Initialize the app
displayMods();
