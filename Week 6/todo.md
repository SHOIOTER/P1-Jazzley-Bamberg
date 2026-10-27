Algemeen:

- Stats voor het huisdier
- Functie voor het veranderen van scene (woonkamer, keuken, etc)
- Eet systeem
- Slaap systeem
- Speel systeem
- De art voor het husidier
- Gezondheids systeem
- Variabelen fullness, energy, happiness en health
- Een stats save systeem (localStorage)
- Achtergrond elementen (bank, klok, TV, etc)
- Knoppen om de scene te veranderen

Status balken:

- Health: Green (high) > Red (low)
- Happiness: Yellow (high) > Blue (low)
- Fullness: Lighter Brown (high) > Darker Brown (low)
- Energy: Brighter Pink (high) > Darker Purple (low)

Animatie regels:

- Action animations always take priority over idle animations
- Action animations can cancel another action animation out if it was playing
- Same rule applies for idle animations
- When an idle animation is played when an action animation is played, it will play when the other animation is done
- Idle animations can never cancel action animations out
- Action animations can only temporarely cancel out the idle, letting it play again when it's done as stated before

- **Statistieken van het huisdier:**
  - Het huisdier heeft **vier** statistieken: honger, energie, geluk en gezondheid.
  - Deze statistieken veranderen automatisch over tijd, maar ook door de acties die jij uitvoert:
    - **Voeden** vermindert honger en verhoogt energie.
      - Te veel voeden verlaagt de gezondheid.
    - **Spelen** verhoogt geluk maar verlaagt energie.
    - **Schoonmaken** verhoogt gezondheid.
- **Acties van de speler:**
  - Je kunt het huisdier **voeden, laten slapen, met het spelen en schoonmaken**. Elke actie verandert meerdere statistieken.
- **Tijdsverloop:**
  - De statistieken gaan **automatisch omlaag over tijd**. Na een tijdje wordt je huisdier moe, hongerig of ongelukkig.
  - Gebruik een **slaapmodus**, zodat je dier energie en gezondheid terugkrijgt door te slapen.
- **Feedback:**
  - Je krijgt visuele feedback van het huisdier afhankelijk van hoe het zich voelt. Bijvoorbeeld:
    - Als je huisdier blij is, glimlacht het.
    - Als de gezondheid laag is, ziet het er ziek uit.
- **Data opslag:**
  - Zorg ervoor dat de game niet steeds opnieuw begint en onthoudt hoe het met je Tamagotchi gaat als je de game weer opstart.
