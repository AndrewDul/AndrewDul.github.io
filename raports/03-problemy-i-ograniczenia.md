# Problemy i ograniczenia

Data: 10 listopada 2026

## Brak gotowego backendu AI

Statyczna strona na GitHub Pages nie jest bezpiecznym miejscem na klucz API ani logikę agenta. To ograniczenie jest celowo widoczne w interfejsie: asystent odpowiada wyłącznie komunikatem prototypu i niczego nie wysyła.

## Usługa formularza

Formularz jest podłączony do FormSubmit. Przed rozpoczęciem dostarczania wiadomości właściciel skrzynki musi kliknąć jednorazowy link aktywacyjny otrzymany po pierwszym przesłaniu formularza. Wiadomość zostaje następnie przekazana przez zewnętrzną usługę, więc odwiedzający są o tym informowani przy formularzu. FormSubmit ma własne mechanizmy antyspamowe, a dodatkowo formularz używa niewidocznego pola honeypot.

## Zawartość case studies

Podstrony są funkcjonalne, ale są pierwszym szkicem case studies. Nie zawierają jeszcze osobistych zrzutów ekranu, wideo, pełnej historii decyzji ani opisów własnego wkładu ponad informacje potwierdzone w dokumentacji.

## Publikacja

Strona nie została opublikowana, nie utworzono repozytorium i nie połączono folderu z GitHubem. Wymaga to osobnej, wyraźnej decyzji użytkownika.

## Weryfikacja wizualna

Sprawdzono lokalnie stronę główną w widoku komputerowym i w widoku mobilnym o szerokości 390 px, przełącznik motywu, mobilne menu, podstronę NeXa oraz prototyp asystenta. Konsola nie wykazała błędów JavaScript. Nadal warto sprawdzić stronę w dodatkowych przeglądarkach po dodaniu obrazów lub przed publikacją; różnice mogą dotyczyć głównie fontów systemowych i efektu `backdrop-filter`, ale zawartość pozostaje czytelna bez niego.
