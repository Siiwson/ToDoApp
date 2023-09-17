# Todo List - Projekt Uniwersalne Metody Projektowania Aplikacji na Urządzenia Mobilne i Wbudowane
Aplikacja została napisana za pomocą React Native przy użyciu platformy Expo - platforma typu open source do tworzenia uniwersalnych aplikacji natywnych na Androida, iOS i Internet za pomocą JavaScript i React. <br>
Testy zostały wykonane za pomocą aplikacji "Expo GO" na urządzeniach iOS oraz Android. <br>
Aplikacja przechowuje wszystkie dane za pomocą Firebase'a. <br> 

## Konfiguracja
Po sklonowaniu aplikacji z repozytorium wpisujemy następujące komendy w celu poprawnego uruchomienia aplikacji:
``` 
npm install expo firebase 
```
Następnie aby uruchomić używamy
```
npx expo start
```
W zależności od platfromy, ktróą chcemy zobaczyć mozemy nacisnąć ```a``` dla androida lub ```i``` dla ios. <br>
Wszystkie użyte paczki w aplikacji to:
```
expo
firebase
@react-native-async-storage/async-storage
@react-navigation/native
@react-navigation/native-stack
expo-auth-session
expo-constants
react-native-vector-icons
expo-status-bar

```

# Todo List - Instrukcja użytkowania
Aplikacja służy do organizowania, śledzenia i zarządzania swoimi zadaniami, obowiązkami oraz listami rzeczy do zrobienia. Są one przydatne zarówno w życiu osobistym, jak i zawodowym, umożliwiając użytkownikom planowanie i monitorowanie swoich codziennych obowiązków.
Aplikacja posiada ciemny oraz jasny motyw, który dopiera się względem motywu systemowego. <br>

## Opis działania aplikacji:
- Pierwszą rzecz, jaką zobaczymy po włączeniu aplikacji, jest formularz logowania.
- Wypełniamy e-mail i hasło. Jeżeli mamy założone konto klikamy "Login".
- W momencie gdy nie mamy konta, klikamy "Create account" - konto zostanie stworzone, za pomocą wcześniej wpisanych danych.
- Aby zalogwać się za pomocą konta google klikamy "Sign in with Google!" (Nie działa aktualnie).
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/04ca12be-7edd-4d1a-a574-83df0c59a9c1"  width="500"/>

- Na głównej stronie widzimy pole, w którym wpisujemy nazwę naszej listy z zadaniami.
- Poniżej znajduje się 6 kolorów, dzięki którym możemy nadać naszej liscie odpowiedni kolor.
- Po wprowadzeniu i wybraniu klikamy przycisk "Save List"
- Na ekranie pojawi się stworzona lista.
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/0a5f02ef-a03e-47f9-b575-b8bbf59868b1"  width="500"/>
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/6d256cf4-3331-4f81-8e2b-91f004900586"  width="500"/>

- Długie naciśnięcie listy spowoduje wyświetlenie okienka usunięcia.
- Naciskając przycisk "Delete" usuwamy ją.
- Naciśnięcie przycisku "X" wylogowuje nas z aplikacji.
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/9fe7598e-3200-4d0b-b980-ecbd33c64a1f"  width="500"/>

- Szybkie naciśnięcie listy otwiera zadania zapisane w owej liście.
- Aby dodać nowe zadanie wprowadzamny jego treść w polu "Add task to [list name] list!
- Następnie klikamy "Save task"
- Na ekranie pojawi się nowo dodane zadanie.
- Długie naciśnięcie zmienie status zadania na wykonane.
- Naciśnięcie przycisku kosza pyta nas czy napewno chcemy usunąć zadanie.
- Szybkie naciśnięcie prowadzi nas do ekranu z samą treścią zadania - przydatne gdy zadanie jest dłuższe niż 35 znaków.
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/ea4a82de-6a2c-4903-8c70-e9ab3623ecb7"  width="500"/>
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/dcda2e22-159c-4d8c-9f24-dd44138b3f17"  width="500"/>

- W tym miejscu wyswietla się całe zadanie.
- Naciśnięcie przycisku kosza usuwa owe zadanie.
- Przycisk "Home" powraca do listy zadań.
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/03da495e-63d0-4b60-a909-f8317ef39e0a"  width="500"/>
<img src="https://github.com/Siiwson/ToDoApp/assets/72451564/56531995-b090-432b-aa7e-6ca601ac141c"  width="500"/>


