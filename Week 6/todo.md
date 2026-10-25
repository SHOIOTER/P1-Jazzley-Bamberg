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