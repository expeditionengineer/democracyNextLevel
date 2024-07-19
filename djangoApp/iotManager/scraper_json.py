import requests

class WebScraper:
    """
    Ein Web-Scraper zum Extrahieren von Veranstaltungsinformationen von einer Webseite.

    Attribute:
        url (str): Die URL der Webseite, die gescraped werden soll.
        events (list): Eine Liste zur Speicherung der extrahierten Veranstaltungsinformationen.
    """

    def __init__(self, url):
        """
        Initialisiert den WebScraper mit einer URL.

        Args:
            url (str): Die URL der Webseite, die gescraped werden soll.
        """
        self.url = url
        self.events = []

    def run(self):
        """
        Führt den Web-Scraper aus, um Veranstaltungsinformationen zu extrahieren.
        
        Sendet eine GET-Anfrage an die angegebene URL, analysiert den HTML-Inhalt
        und extrahiert Veranstaltungsinformationen wie Titel, Link, Datum, Startzeit,
        Endzeit, Ort und Beschreibung.
        """
        try:
            response = requests.get(self.url, timeout=20)
            if response.status_code == 200:
                json_data = response.json()
                event_count = len(json_data.get("events", []))
                print(f"Anstehende {event_count} Veranstaltungen werden abgerufen!")

                for event in json_data.get("events", []):
                    venue = event.get("venue", {})
                    organizer = event.get("organizer", [])[0] if len(event.get("organizer", [])) > 0 else {}
                    start_date = event.get("start_date", "")
                    event_info = {
                        "Name": event.get("title", ""),
                        "Link": event.get("url", ""),
                        "Datum": start_date.split(" ")[0] if " " in start_date else start_date,
                        "Beginn": event.get("start_date", ""),
                        "Ende": event.get("end_date", ""),
                        "Beschreibung": event.get("description", ""),
                        "Ort": venue.get("venue", "") if isinstance(venue, dict) else "",
                        "Adresse": venue.get("address", "") if isinstance(venue, dict) else "",
                        "Postleitzahl": venue.get("zip", "") if isinstance(venue, dict) else "",
                        "Stadt": venue.get("province", "") if isinstance(venue, dict) else "",
                        "Modified": event.get("modified", ""),
                        "Organisator.Name": organizer.get("organizer", ""),
                        "Organisator.Telefon": organizer.get("phone", ""),
                        "Organisator.Email": organizer.get("email", ""),
                    }
                    self.events.append(event_info)

                for event in self.events:
                    print(event)
            else:
                print(f"Fehler beim Abrufen der Webseite. Statuscode: {response.status_code}")
        except requests.exceptions.Timeout:
            print("Zeitüberschreitung bei der Anfrage nach 20 Sekunden")
        except requests.exceptions.RequestException as e:
            print(f"Ein Fehler ist aufgetreten: {e}")
