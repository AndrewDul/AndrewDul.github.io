# Aktualizacja: wybór projektów i identyfikacja

## Wykonane zmiany

- Skrócono główny tytuł do `Software, AI.`.
- Dodano w sekcji „About me” zainteresowania matematyką, astronomią i fizyką.
- Zmieniono znak przy imieniu w górnej nawigacji: żółta kulka porusza się po orbicie wokół większego koła.
- Dodano płynną zmianę widocznego imienia z „Andrzej” na „Andrew”. Tekst pozostaje prawdziwym tekstem HTML, więc jest czytelny dla technologii asystujących i ostry na każdym ekranie.
- Na telefonie przycisk menu został przesunięty bezpośrednio obok imienia, a przełącznik motywu pozostaje po prawej stronie.
- Usunięto z głównej listy DDBN i NeXa, ponieważ ich publiczne opisy wskazują etap fundamentów, a nie gotowy produkt.
- Dodano projekty gier Color Clash i Save The Man wraz z osobnymi stronami oraz linkami do repozytoriów i działających dem.

## Uzasadnienie wyboru

Główna sekcja projektów ma teraz pokazywać prace z konkretną, opisaną implementacją: KoffeeCraft, BeyondEarth, Taskify oraz dwie gry. DDBN i NeXa można później dodać do osobnej sekcji „In progress” lub dziennika budowy, gdzie ich aktualny etap będzie przedstawiony bez sugerowania ukończenia.

## Sprawdzone źródła

- README Color Clash opisuje działające demo, mechanikę dopasowywania kafelków, kombinacje, power-upy i system doświadczenia.
- README Save The Man opisuje działające demo, wybór kategorii, punktację, losowanie słów, obsługę tur i responsywny interfejs.
- README NeXa podaje status M0 — Foundation oraz brak zaimplementowanych funkcji produktu.
- README DDBN opisuje projekt jako foundation-stage i zaznacza, że marketplace produkcyjny nie jest uruchomiony.

## Kolejny krok

Po akceptacji wyglądu można opublikować tę aktualizację w repozytorium oraz na GitHub Pages. Następnie warto przygotować screenshoty i bardziej osobiste opisy dla każdej gotowej realizacji.

## Doprecyzowanie animacji imienia

Pierwsza wersja zmieniała całe słowo naraz. Została zastąpiona animacją siedmiu niezależnych „bębnów” literowych: wszystkie przewijają litery z góry na dół, a potem zatrzymują się kolejno, układając najpierw `Andrzej`, a następnie `Andrew`. Przy krótszym wariancie ostatni bęben znika dopiero po zakończeniu przewijania, dzięki czemu nazwisko naturalnie przesuwa się bliżej imienia.
