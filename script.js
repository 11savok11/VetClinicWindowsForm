document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initMobileMenu();
    initSlider();
    initForms();
    initBookRating();
    initProfileEdit();
    initAdminPanel();
});

// Мобильное меню
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Закрытие меню при клике вне его
        document.addEventListener('click', function(event) {
            if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
                mainNav.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
}

// Слайдер на главной странице
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let slideInterval;
    
    // Функция показа слайда
    function showSlide(n) {
        // Скрыть все слайды
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Корректировка индекса
        if (n >= slides.length) currentSlide = 0;
        if (n < 0) currentSlide = slides.length - 1;
        
        // Показать текущий слайд
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Следующий слайд
    function nextSlide() {
        currentSlide++;
        showSlide(currentSlide);
    }
    
    // Предыдущий слайд
    function prevSlide() {
        currentSlide--;
        showSlide(currentSlide);
    }
    
    // Обработчики кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
            startAutoSlide();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
            startAutoSlide();
        });
    }
    
    // Обработчики точек
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            clearInterval(slideInterval);
            currentSlide = index;
            showSlide(currentSlide);
            startAutoSlide();
        });
    });
    
    // Автоматическое переключение слайдов
    function startAutoSlide() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Запуск слайдера
    showSlide(currentSlide);
    startAutoSlide();
}

// Валидация форм
function initForms() {
    // Форма подписки на главной
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('subscribeEmail');
            const checkbox = document.getElementById('agreeCheckbox');
            const emailError = document.getElementById('emailError');
            const checkboxError = document.getElementById('checkboxError');
            
            let isValid = true;
            
            // Валидация email
            if (!validateEmail(email.value)) {
                email.classList.add('error');
                emailError.textContent = 'Введите корректный email адрес';
                emailError.classList.add('show');
                isValid = false;
            } else {
                email.classList.remove('error');
                emailError.classList.remove('show');
            }
            
            // Валидация чекбокса
            if (!checkbox.checked) {
                checkboxError.textContent = 'Необходимо согласие на обработку данных';
                checkboxError.classList.add('show');
                isValid = false;
            } else {
                checkboxError.classList.remove('show');
            }
            
            if (isValid) {
                // Имитация отправки
                const submitBtn = subscribeForm.querySelector('.btn-subscribe');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Отправка...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Спасибо за подписку! Вы будете получать уведомления о новинках.');
                    subscribeForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Форма входа
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            
            let isValid = true;
            
            // Валидация email
            if (!validateEmail(email.value)) {
                email.classList.add('error');
                emailError.textContent = 'Введите корректный email адрес';
                emailError.classList.add('show');
                isValid = false;
            } else {
                email.classList.remove('error');
                emailError.classList.remove('show');
            }
            
            // Валидация пароля
            if (password.value.length < 6) {
                password.classList.add('error');
                passwordError.textContent = 'Пароль должен содержать не менее 6 символов';
                passwordError.classList.add('show');
                isValid = false;
            } else {
                password.classList.remove('error');
                passwordError.classList.remove('show');
            }
            
            if (isValid) {
                // Имитация входа
                const submitBtn = loginForm.querySelector('.btn-auth');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Вход...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Вход выполнен успешно! Перенаправляем в личный кабинет...');
                    window.location.href = 'profile.html';
                }, 1500);
            }
        });
    }
    
    // Форма регистрации
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('regEmail');
            const firstName = document.getElementById('firstName');
            const password = document.getElementById('regPassword');
            const confirmPassword = document.getElementById('confirmPassword');
            const checkbox = document.getElementById('agreeCheckboxReg');
            
            const emailError = document.getElementById('regEmailError');
            const firstNameError = document.getElementById('firstNameError');
            const passwordError = document.getElementById('regPasswordError');
            const confirmPasswordError = document.getElementById('confirmPasswordError');
            const agreeError = document.getElementById('agreeError');
            
            let isValid = true;
            
            // Валидация email
            if (!validateEmail(email.value)) {
                email.classList.add('error');
                emailError.textContent = 'Введите корректный email адрес';
                emailError.classList.add('show');
                isValid = false;
            } else {
                email.classList.remove('error');
                emailError.classList.remove('show');
            }
            
            // Валидация имени
            if (firstName.value.trim().length < 2) {
                firstName.classList.add('error');
                firstNameError.textContent = 'Имя должно содержать не менее 2 символов';
                firstNameError.classList.add('show');
                isValid = false;
            } else {
                firstName.classList.remove('error');
                firstNameError.classList.remove('show');
            }
            
            // Валидация пароля
            if (password.value.length < 6) {
                password.classList.add('error');
                passwordError.textContent = 'Пароль должен содержать не менее 6 символов';
                passwordError.classList.add('show');
                isValid = false;
            } else {
                password.classList.remove('error');
                passwordError.classList.remove('show');
            }
            
            // Проверка совпадения паролей
            if (password.value !== confirmPassword.value) {
                confirmPassword.classList.add('error');
                confirmPasswordError.textContent = 'Пароли не совпадают';
                confirmPasswordError.classList.add('show');
                isValid = false;
            } else {
                confirmPassword.classList.remove('error');
                confirmPasswordError.classList.remove('show');
            }
            
            // Валидация чекбокса
            if (!checkbox.checked) {
                agreeError.textContent = 'Необходимо согласие на обработку данных';
                agreeError.classList.add('show');
                isValid = false;
            } else {
                agreeError.classList.remove('show');
            }
            
            if (isValid) {
                // Имитация регистрации
                const submitBtn = registerForm.querySelector('.btn-auth');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Регистрация...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    alert('Регистрация прошла успешно! Перенаправляем в личный кабинет...');
                    window.location.href = 'profile.html';
                }, 1500);
            }
        });
    }
    
    // Функция валидации email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Рейтинг книг звездами
function initBookRating() {
    const ratingStars = document.querySelectorAll('.rating-stars i');
    
    if (ratingStars.length > 0) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const ratingValue = this.getAttribute('data-value');
                const ratingContainer = this.closest('.rating-stars');
                
                // Удаляем класс filled у всех звезд
                ratingContainer.querySelectorAll('i').forEach(s => {
                    s.classList.remove('filled');
                });
                
                // Добавляем класс filled до выбранной звезды
                for (let i = 0; i < ratingValue; i++) {
                    ratingStars[i].classList.add('filled');
                }
                
                // Показываем выбранный рейтинг
                const ratingValueEl = ratingContainer.querySelector('.rating-value');
                if (ratingValueEl) {
                    ratingValueEl.textContent = ratingValue;
                }
                
                // Здесь можно отправить рейтинг на сервер
                console.log(`Пользователь поставил оценку: ${ratingValue}`);
            });
            
            // Эффект при наведении
            star.addEventListener('mouseover', function() {
                const hoverValue = this.getAttribute('data-value');
                const ratingContainer = this.closest('.rating-stars');
                const stars = ratingContainer.querySelectorAll('i');
                
                // Временно подсвечиваем звезды
                stars.forEach((s, index) => {
                    if (index < hoverValue) {
                        s.style.color = '#ffc107';
                    } else {
                        s.style.color = '#e0e0e0';
                    }
                });
            });
            
            star.addEventListener('mouseout', function() {
                const ratingContainer = this.closest('.rating-stars');
                const stars = ratingContainer.querySelectorAll('i');
                
                // Возвращаем исходные цвета
                stars.forEach(s => {
                    s.style.color = '';
                });
            });
        });
    }
}

// Редактирование профиля
function initProfileEdit() {
    const editPersonalInfoBtn = document.getElementById('editPersonalInfo');
    const changeEmailBtn = document.getElementById('changeEmail');
    const addToLibraryBtn = document.getElementById('addToLibrary');
    
    // Редактирование личной информации
    if (editPersonalInfoBtn) {
        editPersonalInfoBtn.addEventListener('click', function() {
            const nameItem = document.querySelector('.info-item:first-child');
            const nameValue = nameItem.querySelector('.info-value');
            const nameEdit = nameItem.querySelector('.info-edit');
            
            if (nameEdit.style.display === 'none' || nameEdit.style.display === '') {
                nameValue.style.display = 'none';
                nameEdit.style.display = 'flex';
            } else {
                nameValue.style.display = 'inline';
                nameEdit.style.display = 'none';
            }
        });
    }
    
    // Изменение email
    if (changeEmailBtn) {
        changeEmailBtn.addEventListener('click', function() {
            const emailItem = this.closest('.info-item');
            const emailValue = emailItem.querySelector('.info-value');
            const emailEdit = emailItem.querySelector('.info-edit');
            const changeBtn = emailItem.querySelector('.btn-change');
            
            changeBtn.style.display = 'none';
            emailValue.style.display = 'none';
            emailEdit.style.display = 'flex';
        });
    }
    
    // Кнопки сохранения
    const saveButtons = document.querySelectorAll('.btn-save');
    saveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const field = this.getAttribute('data-field');
            const input = this.previousElementSibling;
            const value = input.value;
            
            if (field === 'name') {
                document.getElementById('userName').textContent = value;
                // Закрываем редактор
                const nameEdit = this.closest('.info-edit');
                const nameValue = nameEdit.previousElementSibling;
                nameValue.style.display = 'inline';
                nameEdit.style.display = 'none';
            } else if (field === 'email') {
                document.getElementById('userEmail').textContent = value;
                // Закрываем редактор и показываем кнопку изменения
                const emailItem = this.closest('.info-item');
                const emailValue = emailItem.querySelector('.info-value');
                const emailEdit = emailItem.querySelector('.info-edit');
                const changeBtn = emailItem.querySelector('.btn-change');
                
                emailValue.style.display = 'inline';
                emailEdit.style.display = 'none';
                changeBtn.style.display = 'inline-block';
            }
            
            // Имитация сохранения на сервере
            alert(`Изменения сохранены: ${field} = ${value}`);
        });
    });
    
    // Добавление книги в библиотеку
    if (addToLibraryBtn) {
        addToLibraryBtn.addEventListener('click', function() {
            const bookTitle = document.querySelector('.book-title-large').textContent;
            
            // Меняем состояние кнопки
            if (this.classList.contains('added')) {
                this.classList.remove('added');
                this.innerHTML = '<i class="fas fa-plus-circle"></i> Добавить в мои книги';
                alert(`Книга "${bookTitle}" удалена из вашей библиотеки`);
            } else {
                this.classList.add('added');
                this.innerHTML = '<i class="fas fa-check-circle"></i> В моих книгах';
                alert(`Книга "${bookTitle}" добавлена в вашу библиотеку`);
            }
        });
    }
}

// Админ-панель
function initAdminPanel() {
    // Проверяем, находимся ли мы на странице админ-панели
    if (!document.querySelector('.admin-panel')) return;
    
    // Инициализация всех функций админ-панели
    initAdminTabs();
    initGenreManagement();
    initBookManagement();
    initReviewsManagement();
    initImageUpload();
}

// Вкладки админ-панели
function initAdminTabs() {
    const tabButtons = document.querySelectorAll('.admin-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Удаляем активный класс у всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке и контенту
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Управление жанрами
function initGenreManagement() {
    const addGenreBtn = document.getElementById('addGenreBtn');
    const genreForm = document.getElementById('genreForm');
    const genreTableBody = document.querySelector('#genresTable tbody');
    
    if (!addGenreBtn) return;
    
    // Данные жанров (в реальном проекте загружаются с сервера)
    let genres = [
        { id: 1, name: 'Классическая литература', description: 'Произведения, признанные классикой мировой литературы', bookCount: 125 },
        { id: 2, name: 'Фантастика', description: 'Научная фантастика, фэнтези, альтернативная история', bookCount: 89 },
        { id: 3, name: 'Детективы', description: 'Детективные романы и триллеры', bookCount: 67 },
        { id: 4, name: 'Романы', description: 'Любовные романы и драмы', bookCount: 54 },
        { id: 5, name: 'Биографии', description: 'Биографии известных личностей', bookCount: 32 }
    ];
    
    // Отображение жанров в таблице
    function renderGenres() {
        if (!genreTableBody) return;
        
        genreTableBody.innerHTML = '';
        
        genres.forEach(genre => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${genre.id}</td>
                <td>${genre.name}</td>
                <td>${genre.description}</td>
                <td>${genre.bookCount}</td>
                <td class="actions">
                    <button class="btn-edit" data-id="${genre.id}">Редактировать</button>
                    <button class="btn-delete" data-id="${genre.id}" ${genre.bookCount > 0 ? 'disabled' : ''}>Удалить</button>
                </td>
            `;
            genreTableBody.appendChild(row);
        });
        
        // Добавляем обработчики для кнопок редактирования и удаления
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const genreId = parseInt(this.getAttribute('data-id'));
                editGenre(genreId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const genreId = parseInt(this.getAttribute('data-id'));
                deleteGenre(genreId);
            });
        });
    }
    
    // Добавление нового жанра
    if (addGenreBtn && genreForm) {
        addGenreBtn.addEventListener('click', function() {
            // Показываем форму
            genreForm.style.display = 'block';
            genreForm.scrollIntoView({ behavior: 'smooth' });
            
            // Сбрасываем форму
            genreForm.reset();
            genreForm.dataset.mode = 'add';
            genreForm.dataset.id = '';
            
            // Обновляем заголовок
            genreForm.querySelector('h3').textContent = 'Добавить новый жанр';
        });
        
        // Обработка отправки формы
        genreForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('genreName').value;
            const description = document.getElementById('genreDescription').value;
            const nameError = document.getElementById('genreNameError');
            const descriptionError = document.getElementById('genreDescriptionError');
            
            let isValid = true;
            
            // Валидация
            if (name.trim().length < 3) {
                nameError.textContent = 'Название должно содержать не менее 3 символов';
                nameError.style.display = 'block';
                isValid = false;
            } else {
                nameError.style.display = 'none';
            }
            
            if (description.trim().length < 10) {
                descriptionError.textContent = 'Описание должно содержать не менее 10 символов';
                descriptionError.style.display = 'block';
                isValid = false;
            } else {
                descriptionError.style.display = 'none';
            }
            
            if (!isValid) return;
            
            // Добавление или редактирование жанра
            if (this.dataset.mode === 'add') {
                // Добавляем новый жанр
                const newId = genres.length > 0 ? Math.max(...genres.map(g => g.id)) + 1 : 1;
                genres.push({
                    id: newId,
                    name: name,
                    description: description,
                    bookCount: 0
                });
                
                alert('Жанр успешно добавлен');
            } else if (this.dataset.mode === 'edit') {
                // Редактируем существующий жанр
                const genreId = parseInt(this.dataset.id);
                const genreIndex = genres.findIndex(g => g.id === genreId);
                
                if (genreIndex !== -1) {
                    genres[genreIndex].name = name;
                    genres[genreIndex].description = description;
                }
                
                alert('Жанр успешно обновлен');
            }
            
            // Скрываем форму и обновляем таблицу
            this.style.display = 'none';
            renderGenres();
        });
        
        // Кнопка отмены
        const cancelBtn = genreForm.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                genreForm.style.display = 'none';
            });
        }
    }
    
    // Редактирование жанра
    function editGenre(genreId) {
        const genre = genres.find(g => g.id === genreId);
        if (!genre) return;
        
        // Заполняем форму
        document.getElementById('genreName').value = genre.name;
        document.getElementById('genreDescription').value = genre.description;
        
        // Показываем форму
        genreForm.style.display = 'block';
        genreForm.scrollIntoView({ behavior: 'smooth' });
        
        // Устанавливаем режим редактирования
        genreForm.dataset.mode = 'edit';
        genreForm.dataset.id = genreId;
        genreForm.querySelector('h3').textContent = 'Редактировать жанр';
    }
    
    // Удаление жанра
    function deleteGenre(genreId) {
        const genre = genres.find(g => g.id === genreId);
        if (!genre) return;
        
        // Проверяем, есть ли книги в этом жанре
        if (genre.bookCount > 0) {
            alert('Невозможно удалить жанр, так как в нем есть книги');
            return;
        }
        
        // Подтверждение удаления
        if (confirm(`Вы уверены, что хотите удалить жанр "${genre.name}"?`)) {
            genres = genres.filter(g => g.id !== genreId);
            renderGenres();
            alert('Жанр успешно удален');
        }
    }
    
    // Инициализация
    renderGenres();
}

// Управление книгами
function initBookManagement() {
    const addBookBtn = document.getElementById('addBookBtn');
    const bookForm = document.getElementById('bookForm');
    const booksTableBody = document.querySelector('#booksTable tbody');
    
    if (!addBookBtn) return;
    
    // Данные книг (в реальном проекте загружаются с сервера)
    let books = [
        { id: 1, title: 'Мастер и Маргарита', author: 'Михаил Булгаков', year: 1967, genre: 'Классическая литература', rating: 4.7 },
        { id: 2, title: '1984', author: 'Джордж Оруэлл', year: 1949, genre: 'Фантастика', rating: 4.5 },
        { id: 3, title: 'Маленький принц', author: 'Антуан де Сент-Экзюпери', year: 1943, genre: 'Классическая литература', rating: 4.8 },
        { id: 4, title: 'Преступление и наказание', author: 'Федор Достоевский', year: 1866, genre: 'Классическая литература', rating: 4.6 }
    ];
    
    // Отображение книг в таблице
    function renderBooks() {
        if (!booksTableBody) return;
        
        booksTableBody.innerHTML = '';
        
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.year}</td>
                <td>${book.genre}</td>
                <td>${book.rating}</td>
                <td class="actions">
                    <button class="btn-edit" data-id="${book.id}">Редактировать</button>
                    <button class="btn-delete" data-id="${book.id}">Удалить</button>
                </td>
            `;
            booksTableBody.appendChild(row);
        });
        
        // Добавляем обработчики для кнопок
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                editBook(bookId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                deleteBook(bookId);
            });
        });
    }
    
    // Добавление новой книги
    if (addBookBtn && bookForm) {
        addBookBtn.addEventListener('click', function() {
            bookForm.style.display = 'block';
            bookForm.scrollIntoView({ behavior: 'smooth' });
            bookForm.reset();
            bookForm.dataset.mode = 'add';
            bookForm.dataset.id = '';
            bookForm.querySelector('h3').textContent = 'Добавить новую книгу';
            const preview = document.getElementById('coverPreview');
            if (preview) {
                preview.style.display = 'none';
            }
        });

        bookForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const title = document.getElementById('bookTitle').value;
            const author = document.getElementById('bookAuthor').value;
            const description = document.getElementById('bookDescription').value;
            const year = document.getElementById('bookYear').value;
            const genre = document.getElementById('bookGenre').value;
            const coverInput = document.getElementById('bookCover');

            let isValid = validateBookForm();
            
            if (!isValid) return;

            if (this.dataset.mode === 'add' && coverInput.files.length === 0) {
                alert('Пожалуйста, загрузите обложку книги');
                return;
            }

            if (coverInput.files.length > 0) {
                const file = coverInput.files[0];
                processImage(file, function(thumbnailData) {
                    console.log('Миниатюра создана:', thumbnailData);
                });
            }
            
            if (this.dataset.mode === 'add') {
                const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
                books.push({
                    id: newId,
                    title: title,
                    author: author,
                    description: description,
                    year: parseInt(year),
                    genre: genre,
                    rating: 0
                });
                
                alert('Книга успешно добавлена');
            } else if (this.dataset.mode === 'edit') {
                const bookId = parseInt(this.dataset.id);
                const bookIndex = books.findIndex(b => b.id === bookId);
                
                if (bookIndex !== -1) {
                    books[bookIndex].title = title;
                    books[bookIndex].author = author;
                    books[bookIndex].description = description;
                    books[bookIndex].year = parseInt(year);
                    books[bookIndex].genre = genre;
                }
                
                alert('Книга успешно обновлена');
            }
            
            this.style.display = 'none';
            renderBooks();
        });
        
        const cancelBtn = bookForm.querySelector('.btn-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', function() {
                bookForm.style.display = 'none';
            });
        }

        const coverInput = document.getElementById('bookCover');
        if (coverInput) {
            coverInput.addEventListener('change', function() {
                if (this.files && this.files[0]) {
                    const preview = document.getElementById('coverPreview');
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        preview.src = e.target.result;
                        preview.style.display = 'block';
                    }
                    
                    reader.readAsDataURL(this.files[0]);
                }
            });
        }
    }

    function validateBookForm() {
        const title = document.getElementById('bookTitle');
        const author = document.getElementById('bookAuthor');
        const year = document.getElementById('bookYear');
        const currentYear = new Date().getFullYear();
        
        let isValid = true;

        if (title.value.trim().length < 2) {
            showError('bookTitleError', 'Название должно содержать не менее 2 символов');
            isValid = false;
        } else if (title.value.length > 100) {
            showError('bookTitleError', 'Название не должно превышать 100 символов');
            isValid = false;
        } else {
            hideError('bookTitleError');
        }
        
        if (author.value.trim().length < 2) {
            showError('bookAuthorError', 'Имя автора должно содержать не менее 2 символов');
            isValid = false;
        } else if (author.value.length > 50) {
            showError('bookAuthorError', 'Имя автора не должно превышать 50 символов');
            isValid = false;
        } else {
            hideError('bookAuthorError');
        }

        const description = document.getElementById('bookDescription');
        if (description.value.length > 500) {
            showError('bookDescriptionError', 'Описание не должно превышать 500 символов');
            isValid = false;
        } else {
            hideError('bookDescriptionError');
        }

        const yearValue = parseInt(year.value);
        if (isNaN(yearValue)) {
            showError('bookYearError', 'Год должен быть числом');
            isValid = false;
        } else if (yearValue < 1000 || yearValue > currentYear) {
            showError('bookYearError', `Год должен быть между 1000 и ${currentYear}`);
            isValid = false;
        } else {
            hideError('bookYearError');
        }
        
        return isValid;
    }

    function editBook(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;

        document.getElementById('bookTitle').value = book.title;
        document.getElementById('bookAuthor').value = book.author;
        document.getElementById('bookDescription').value = book.description || '';
        document.getElementById('bookYear').value = book.year;
        document.getElementById('bookGenre').value = book.genre;

        bookForm.style.display = 'block';
        bookForm.scrollIntoView({ behavior: 'smooth' });

        bookForm.dataset.mode = 'edit';
        bookForm.dataset.id = bookId;
        bookForm.querySelector('h3').textContent = 'Редактировать книгу';

        const coverLabel = document.querySelector('label[for="bookCover"]');
        if (coverLabel) {
            coverLabel.innerHTML = coverLabel.innerHTML.replace('*', '');
        }
    }

    function deleteBook(bookId) {
        const book = books.find(b => b.id === bookId);
        if (!book) return;

        if (confirm(`Вы уверены, что хотите удалить книгу "${book.title}"?`)) {
            books = books.filter(b => b.id !== bookId);
            renderBooks();
            alert('Книга успешно удалена');
        }
    }

    renderBooks();
}

function initReviewsManagement() {
    const reviewsTableBody = document.querySelector('#reviewsTable tbody');
    
    if (!reviewsTableBody) return;

    let reviews = [
        { id: 1, bookTitle: 'Мастер и Маргарита', userEmail: 'reader1@example.com', text: 'Потрясающая книга! Перечитываю уже в третий раз...', rating: 5 },
        { id: 2, bookTitle: '1984', userEmail: 'reader2@example.com', text: 'Жутко актуально в наше время. Каждый должен прочитать...', rating: 4 },
        { id: 3, bookTitle: 'Маленький принц', userEmail: 'reader3@example.com', text: 'Философская сказка для всех возрастов. Очень трогательно...', rating: 5 },
        { id: 4, bookTitle: 'Преступление и наказание', userEmail: 'reader4@example.com', text: 'Тяжелое, но необходимое чтение. Психологический анализ...', rating: 3 }
    ];
    
    function renderReviews() {
        reviewsTableBody.innerHTML = '';
        
        reviews.forEach(review => {
            const row = document.createElement('tr');

            const shortText = review.text.length > 100 ? review.text.substring(0, 100) + '...' : review.text;
            
            row.innerHTML = `
                <td>${review.id}</td>
                <td>${review.bookTitle}</td>
                <td>${review.userEmail}</td>
                <td>${shortText}</td>
                <td>${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</td>
                <td class="actions">
                    <button class="btn-view" data-id="${review.id}">Просмотреть</button>
                    <button class="btn-delete" data-id="${review.id}">Удалить</button>
                </td>
            `;
            reviewsTableBody.appendChild(row);
        });

        document.querySelectorAll('.btn-view').forEach(btn => {
            btn.addEventListener('click', function() {
                const reviewId = parseInt(this.getAttribute('data-id'));
                viewReview(reviewId);
            });
        });
        
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', function() {
                const reviewId = parseInt(this.getAttribute('data-id'));
                deleteReview(reviewId);
            });
        });
    }

    function viewReview(reviewId) {
        const review = reviews.find(r => r.id === reviewId);
        if (!review) return;
        
        alert(`Полный текст рецензии:\n\nКнига: ${review.bookTitle}\nEmail: ${review.userEmail}\nОценка: ${review.rating}/5\n\n${review.text}`);
    }

    function deleteReview(reviewId) {
        const review = reviews.find(r => r.id === reviewId);
        if (!review) return;
        
        if (confirm('Вы уверены, что хотите удалить эту рецензию?')) {
            reviews = reviews.filter(r => r.id !== reviewId);
            renderReviews();
            alert('Рецензия удалена');
        }
    }

    renderReviews();
}

function initImageUpload() {
    const coverInput = document.getElementById('bookCover');
    
    if (!coverInput) return;

    coverInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            const file = this.files[0];

            const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
            if (!validTypes.includes(file.type)) {
                alert('Пожалуйста, выберите файл в формате JPG или PNG');
                this.value = '';
                return;
            }
            
            // Проверка размера файла (2 МБ)
            if (file.size > 2 * 1024 * 1024) {
                alert('Размер файла не должен превышать 2 МБ');
                this.value = '';
                return;
            }
            
            // Создание миниатюры с водяным знаком
            processImage(file, function(thumbnailData) {
                // Отображаем миниатюру
                const preview = document.getElementById('coverPreview');
                if (preview) {
                    preview.src = thumbnailData;
                    preview.style.display = 'block';
                }
                
                console.log('Изображение обработано и готово к загрузке');
            });
        }
    });
}

function processImage(file, callback) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const img = new Image();
        
        img.onload = function() {

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const maxWidth = 300;
            const maxHeight = 300;

            let width = img.width;
            let height = img.height;
            
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'bottom';
            ctx.fillText('Library', width - 10, height - 10);

            const thumbnailData = canvas.toDataURL('image/jpeg', 0.8);

            callback(thumbnailData);
        }
        
        img.src = e.target.result;
    }
    
    reader.readAsDataURL(file);
}

function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function hideError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
    }
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

window.addEventListener('click', function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
