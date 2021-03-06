class: center, middle
#network sockets

---
#network sockets
##термини

--
* <h4>`host`</h4> 
машина в мрежата

--
* <h4>`port`</h4>
специфичен за приложение или процес софтуерен конструкт служещ като крайна точка на мрежова комуникация от гледна точка на операционната система

---
class: center, middle
![ко?](img/ko.jpg)
#ко?!

---
#network sockets
##термини
`port` е номер, с който операционната система асоциира определен процес

Всяка връзка по мрежата има точно определен host и port, което указва машината и процеса на нея, с който искаме да установим връзка.

---
#network sockets
###bind/listen

Един процес може да се „закачи“ към определен порт, т.е. да заяви че ще обработва заявките постъпващи към този порт на тази машина.

```javascript
app.listen(3000);
```

---
#network sockets
###TCP vs UDP

* `Transmission Control Protocol` - гарантира че данните по мрежата винаги достигат до целта и винаги са в правилния ред
* `User Datagram Protocol` - често пъти по-бързо, но без никаква гаранция за успешно доставяне. Често се използва за живи видео/аудио връзки

---
#network sockets
### TCP

.center[
![tcp-joke](img/tcp-joke.png)
]

---
#network sockets
###UDP

.center[
##I've got a UDP joke, but you probably won't get it.
]

---
#(not so) network sockets
###UNIX sockets

На практика не осъществяват мрежова комуникация, а между процеси на една и съща машина. Реализират се чрез

---
#`require('net')`

`net` модула в node ни дава интерфейс за работа с TCP връзки

* `net.createServer([options], [connectionHandler])` - връща `net.Server` обект, на който можем да извикаме `listen`
* `net.connect(port, [host], [connectionHandler])`
  `net.createConnection(port, [host], [connectionHandler])` - връщат `net.Socket` обект, свързан с мрежови ресурс
* `net.connect(path, [connectListener])`
  `net.createConnection(path, [connectListener])` - връща `net.Socket` обект, свързан с UNIX socket

---
#протоколи
По всеки socket може да „тече“ произволна информация. От гледна точка на socket-а, всичко в него е просто поредност от байтове.

На следващото ниво на абстракция са протоколите. Протокола е система от правила за организиране на данните при комуникация.

Очевидния пример: **H**yper **T**ext **T**ransfer **P**rotocol

--

```
GET /index.html HTTP/1.1
Host: fmi.uni-sofia.bg
Accept-Language: bg


```

---
#имплементиране на протоколи

`http.createServer` и `https.createServer` създават сървър обекти, които обработват конкретно HTTP заявки. В този смисъл те са на по-високо ниво на абстракция от сървър създаден с `net.createServer`.

Работим директно със socket-и, когато искаме достъп до неструктурираната форма на текста получен по мрежата. Това може да е резултат от това, че искаме сами да имплементираме някакъв протокол

---
#обикновена TCP връзка вместо HTTP заявки

HTTP е connectionless протокол. Това ще рече, че всяка HTTP заявка е самостоятелна и самия протокол по никакъв начин не дефинира правила за указване на логическа свързаност между заявките. Бисквитките решават **част** от този проблем, HTTP/1.1 - друга, но всичко това е workaround, а не решение.

За поддържане на постоянна връзка, далеч по-разумен подход е използването на чист TCP socket. Socket-а може да остане отворен за произволно време, докато изрично не бъде затворен, или не възникне грешка със свързаността.
