document.addEventListener("DOMContentLoaded", function() {
    fetch('https://raw.githubusercontent.com/tomepro/PlatoXML/refs/heads/main/data.xml')
        .then(response => response.text())
        .then(data => {
            // Parse XML
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "application/xml");
            
            // Accedim als grups i plats
            const carta = document.getElementById("carta");
            const grups = xmlDoc.getElementsByTagName("GRUP");

            // Iterem cada grup
            Array.from(grups).forEach(grup => {
                const nomGrup = grup.getElementsByTagName("NOM")[0].textContent;
                
                // Creem el bloc de grup
                const grupDiv = document.createElement("div");
                grupDiv.classList.add("grup");

                const nomGrupElement = document.createElement("h2");
                nomGrupElement.classList.add("nom-grup");
                nomGrupElement.textContent = nomGrup;
                grupDiv.appendChild(nomGrupElement);

                // Iterem cada plat dins el grup
                const plats = grup.getElementsByTagName("PLAT");
                Array.from(plats).forEach(plat => {
                    const nomPlat = plat.getElementsByTagName("NOM")[0].textContent;
                    const descripcioPlat = plat.getElementsByTagName("DESCRIPCIO")[0].textContent;
                    const preuPlat = plat.getElementsByTagName("PREU")[0].textContent;

                    // Creem el bloc del plat
                    const platDiv = document.createElement("div");
                    platDiv.classList.add("plat");

                    const nomPlatElement = document.createElement("h3");
                    nomPlatElement.classList.add("nom-plat");
                    nomPlatElement.textContent = nomPlat;

                    const descripcioPlatElement = document.createElement("p");
                    descripcioPlatElement.classList.add("descripcio-plat");
                    descripcioPlatElement.textContent = descripcioPlat;

                    const preuPlatElement = document.createElement("span");
                    preuPlatElement.classList.add("preu-plat");
                    preuPlatElement.textContent = `${preuPlat} €`;

                    platDiv.appendChild(nomPlatElement);
                    platDiv.appendChild(descripcioPlatElement);
                    platDiv.appendChild(preuPlatElement);

                    // Afegim el plat al grup
                    grupDiv.appendChild(platDiv);
                });

                // Afegim el grup a la carta
                carta.appendChild(grupDiv);
            });
        })
        .catch(error => console.error("Error en carregar l'XML:", error));
});
