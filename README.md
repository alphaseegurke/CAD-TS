
## Installation

### Backend
1. Python installieren (https://www.python.org/)
2. Abhängigkeiten installieren:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
3. Server starten:
    ```bash
    python app.py
    ```

### FiveM
1. Füge den Ordner `fivem` in deinen FiveM-Server-Ressourcenordner (`resources/`) ein.
2. Aktualisiere die `server.cfg`:
    ```
    ensure fivem
    ```
3. Starte deinen FiveM-Server.

## Verwendung
- **Registrieren**: Noch keine In-Game-Funktion. Registriere Benutzer über die API (z. B. mit Postman).
- **Anmelden**: Nutze den Befehl `/login <benutzername> <passwort>` im Spiel.

## Lizenz
MIT
