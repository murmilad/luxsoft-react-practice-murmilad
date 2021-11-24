## Задание для курса React Advanced ##
Если используется Github Classroom, в коммитах помечайте, какое задание выполнено в соответствии со списком на странице http://localhost:7000/checklist.html

Если не используется Github Classroom, решение может быть передано как ссылка на репозиторий или в формате zip.
В этом случае к решению необходимо приложить CSV чеклист выполненных задач (можно сгенерировать со страницы http://localhost:7000/checklist.html).

Стартовый код представляется из себе фронтенд (npm run start из папки react) и бакенд (npm run start из корневой папки, сервер стартует на порту 7000).
### ЗАДАЧА ###

Разработать приложение со следующей функциональностью (в стартовом коде приложение реализовано частично на "ванильном" react+redux):
1. Каталог книг с возможностью получить информацию о книге, добавить книгу, отредактировать книгу, удалить книгу.
2. Списки рекомендованной литературы (ака плей-листы), с возможностью добавить/удалить/отредактировать список литературы.

Задание (1) должно использовать redux-saga для работы с сервером, с возможностью получить/создать/изменить/удалить книгу, остановить загрузку с сервера, обработать ошибку, если сервер недоступен.

Задание (2) должно использовать redux-observable для работы с сервером, с возможностью получить/создать/изменить/удалить список литературы, остановить загрузку с сервера, обработать ошибку, если сервер недоступен.

Задание (1) должно использовать formik для формы добавления/редактирования книги. Используйте валидацию.

Задание (2) должно использовать react-hook-form для формы добавления/редактирования списка книг. Используйте валидацию.

Также необходимо реализовать:
1.	Тест как минимум для 1 компонента интеграционный (с сервером и асинхронностью) с использованием @testing-library/react
2.	Тест компонента с мокированием сервера 
3.	Тест компонента с мокированием работы с Redux
4.	Тест саги
5.	Тест для эпика
6.	Тест для редьюсера (как минимум одного, не самого простого)
7.	Тест для стора для всего процесса добавления/удаления/просмотра книги и списка книг (используйте redux-dev-tools для генерации)
8.	E2E тест для добавления/удаления книги (также создавайте скриншоты)
9.	E2E тест для добавления/удаления списка книг (также создавайте скриншоты)

Приложение нужно будет разбить на два независимых приложения - для редактирования книг и редактирования списков и объединить их в монорепо с использованием lerna или rush (на выбор)

Дополнительным плюсом будет 
- реализация ленивой подгрузки формы редактирования списка литературы, 
- настройка автоматических тестов на гитхаб через workflow, 
- упаковка всего решения в докер.

Компоненты должны использовать хуки. Не забудьте про мемоизацию (useCallback, useMemo, useRef).
