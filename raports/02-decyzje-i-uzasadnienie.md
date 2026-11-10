# Decyzje i uzasadnienie

Data: 10 listopada 2026

## Technologia

Wybrano czysty HTML, CSS i JavaScript bez frameworka oraz bez zewnętrznych zależności. Dzięki temu strona jest prosta do przeniesienia do pustego repozytorium i bezpośredniego uruchomienia na GitHub Pages. Nie wymaga kroku budowania ani kluczy API.

## Styl wizualny

Inspiracją był poziom przyjazności, miękkie proporcje i karty projektów ze wskazanej strony, ale układ, ilustracje, teksty i kod są autorskie. Zamiast tęczy zastosowano spokojną paletę fioletu, brzoskwini, różu i mięty. Jasny motyw ma kolor kremowy, aby nie był rażąco biały.

## Ruch i dostępność

Animacje są lekkie i tworzone przez CSS. Strona szanuje systemowe ustawienie ograniczenia ruchu. Dodano link do pomijania nawigacji, semantyczne nagłówki, etykiety formularzy, obsługę klawiatury oraz czytelne stany focus.

## Opisy projektów

Przyjęto zasadę: nie przypisywać gotowych funkcji, technologii lub efektów, jeśli nie zostały potwierdzone. Dlatego podstrony używają sformułowań „foundation”, „in development” i „not live” tam, gdzie dokumentacja projektu wskazuje etap prac.

## Asystent AI

AI assistant jest obecnie tylko interfejsem demonstracyjnym. Prawdziwy agent na GitHub Pages nie powinien mieć klucza API w kodzie frontendu. W przyszłości potrzebny będzie osobny backend, ograniczona i zatwierdzona baza wiedzy oraz decyzja o prywatności danych.

## Formularz kontaktowy

Formularz wykorzystuje FormSubmit, aby działał na statycznym GitHub Pages bez umieszczania klucza API w kodzie. Usługa odbiera imię, e-mail i treść wpisaną przez odwiedzającego, a następnie doręcza je na skrzynkę Andrzeja. Formularz jasno informuje o tym przepływie danych i o jednorazowej aktywacji adresu odbiorcy.
