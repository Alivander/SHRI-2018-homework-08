# SHRI-2018-homework-08

### Домашняя работа по теме "Архитектура"

Яндекс. Школа разработки интерфейсов. 2018 год.

Реализация архитектуры flux-фреймворка:  
[ссылка для просмотра собранной страницы](https://alivander.github.io/SHRI-2018-homework-08/)  

После ввода данных в поле, View создает новый Action, передает его в Dispatcher и очищает поле.  
Dispatcher вызывает обработчик Action из Store.  
Store проводит валидацию данных, и запускает обработчик изменений: отправяет новые данные на сервер, запрашивает список всех данных вместе с измененными с сервера, создает событие изменения на нужном элементе страницы.  
View ловит событие изменения и полностью перерисовыввает элемент. 
