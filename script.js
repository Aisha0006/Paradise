// index.html
function page1init() {
  // JS
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");

  function checkWidth() {
    if (window.innerWidth < 450) {
      hamburger.style.display = "block";
      menu.classList.add("collapsed");
    } else {
      hamburger.style.display = "none";
      menu.classList.remove("collapsed", "show");
      menu.style.maxHeight = "none";
    }
  }

  window.addEventListener("resize", checkWidth);
  window.addEventListener("load", checkWidth);

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("show");
  });

  const openFormBtn = document.getElementById("openFormBtn");
  const reviewModal = document.getElementById("reviewModal");
  const closeModal = document.querySelector(".close-rew");
  const reviewForm = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");
  function loadReviews() {
    const saved = localStorage.getItem("reviews");
    if (saved) {
      reviewsList.innerHTML = JSON.parse(saved);
    }
  }
  function saveReviews() {
    localStorage.setItem("reviews", JSON.stringify(reviewsList.innerHTML));
  }
  loadReviews(); // загрузили при запуске
  openFormBtn.onclick = () => {
    reviewModal.style.display = "flex";
  };
  closeModal.onclick = () => {
    reviewModal.style.display = "none";
  };
  window.onclick = (e) => {
    if (e.target === reviewModal) reviewModal.style.display = "none";
  };
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("nameReview").value;
    const text = document.getElementById("textReview").value;
    const rate = document.getElementById("rateReview").value;
    const stars = ["★☆☆☆☆", "★★☆☆☆", "★★★☆☆", "★★★★☆", "★★★★★"][rate - 1];
    const newReview = document.createElement("div");
    newReview.className = "review";
    newReview.innerHTML = `
        <img src="Animals/вектор.webp" alt="avatar" />
        <div>
            <h4>${name}</h4>
            <div class="stars">${stars}</div>
        </div>
        <p>${text}</p>`;
    // добавляем в начало
    reviewsList.prepend(newReview);
    // сохраняем!
    saveReviews();
    reviewModal.style.display = "none";
    reviewForm.reset();
  });
}

// tickets.html
function page2init() {
  let TOKEN = "7846776009:AAEx5nvH0KngFDt3wk1G2FGyVsJkXKHGm5Q";
  let CHAT_ID = "6333476986";
  let URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const buyBtn = document.querySelectorAll(".buy-btn");
  const ticketInput = document.getElementById("ticketType");
  const closeT = document.querySelector(".close");
  const telbot = document.querySelector(".telbot");
  const chat = document.getElementById("chatBox");
  const ticketForm = document.getElementById("tgf3");
  buyBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const ticketName =
        btn.parentElement.querySelector(".ticket-title").textContent;
      ticketInput.value = ticketName;
      telbot.style.display = "flex";
    });
  });
  closeT.onclick = () => (telbot.style.display = "none");
  window.onclick = (e) => {
    if (e.target === telbot) telbot.style.display = "none";
  };
  function openPayment(price) {
    const payWindow = document.createElement("div");
    payWindow.className = "pay-modal";
    payWindow.innerHTML = `
    <div class="pay-box">
      <h3>Оплата билета</h3>
      <label>Выберите способ оплаты:</label>
      <select id="payMethod">
        <option value="MBank">Mbank</option>
        <option value="О!Деньги">О!Деньги</option>
        <option value="Balance.kg">Balance.kg</option>
        <option value="Visa / Mastercard">Visa / Mastercard</option>
      </select>
      <label>Сумма к оплате:</label>
      <input type="text" id="payAmount" value="${price} сом" readonly>
      <button id="confirmPay">Оплатить</button>
    </div>`;
    document.body.appendChild(payWindow);
    setTimeout(() => payWindow.classList.add("show"), 10);
    document.getElementById("confirmPay").onclick = () => {
      payWindow.remove();
      SuccessMessage();
      sendTelegram();
      openTelegramClient();
    };
  }
  function SuccessMessage() {
    chat.style.display = "block";
    chat.innerHTML = `🐾 Спасибо за покупку!<br>✔ Оплата прошла успешно!<br>Ваш билет бронирован.`;
    setTimeout(() => {
      chat.style.display = "none";
    }, 5000);
  }
  let sending = false;
  function sendTelegram() {
    if (sending) return;
    sending = true;
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;
    const date = document.getElementById("dateInput").value;
    const type = document.getElementById("ticketType").value;
    let message = `
📩 *Покупка билета — ОПЛАЧЕНО*  
👤 Имя: ${name}  
📞 Телефон: ${phone}  
📅 Дата: ${date}  
🎫 Тип билета: ${type}`;
    fetch(URL_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      })
    }).finally(() => (sending = false));
  }
  let TOKEN_client = "8268150775:AAHzKuaNAL-vZA9ECsClQL9mSY3zNWn4OqE";
  let CHAT_ID_client = "6318994933";
  let URL_API_client = `https://api.telegram.org/bot${TOKEN_client}/sendMessage`;
  // Открываем Telegram клиенту через payload в /start
  function openTelegramClient() {
    const name = document.getElementById("nameInput").value;
    const phone = document.getElementById("phoneInput").value;
    const date = document.getElementById("dateInput").value;
    const type = document.getElementById("ticketType").value;
    // Формируем payload
    const payload = `🐾 Спасибо за покупку!\nВаше имя|${name}\nВаш номер|${phone}\nВаш билет|${type}\nВремя|${date}\nВаш билет бронирован.`;
    const telegramLink = `https://t.me/Paradise_clients24_bot?start=${payload}`;
    fetch(URL_API_client, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID_client,
        text: payload,
        parse_mode: "Markdown",
      }),
    }).finally(() => (sending = false));
    window.open(telegramLink, "_blank");
  }
  ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    telbot.style.display = "none";
    const type = document.getElementById("ticketType").value;
    // Получаем цену выбранного билета
    const price = [...document.querySelectorAll(".ticket-title")]
      .find((el) => el.textContent === type)
      .closest(".ticket-content")
      .querySelector(".price p")
      .childNodes[0].nodeValue.trim();
    setTimeout(() => {
      openPayment(price);
    }, 300);
  });
}

// galerya.html
function page3init() {
  const animals = [
    {
      name: "Кролик",
      age: 2,
      from: "Нарын",
      img: "Animals/dekorativnyiy-krolik-01.jpg",
      info: "Быстрый и пушистый",
    },
    {
      name: "Обьезянка",
      age: 4,
      from: "Москва",
      img: "Animals/portrait-long-tailed-macaque_181624-34646.avif",
      info: "Милый и пушистый",
    },
    {
      name: "Лиса",
      age: 4,
      from: "Талас",
      img: "Animals/bOc8DN6GFkzcWVVbRumfQ.jpg",
      info: "Умная, любит ласки",
    },
    {
      name: "Кот",
      age: 3,
      from: "Ош",
      img: "Animals/9117447.jpg",
      info: "Ленивый, но милый",
    },
    {
      name: "Собака",
      age: 5,
      from: "Бишкек",
      img: "Animals/images.jpg",
      info: "Верный друг",
    },
    {
      name: "Черепаха",
      age: 12,
      from: "Кыргызстан",
      img: "Animals/cherepaha.jpg",
      info: "Медленная и мудрая",
    },
    {
      name: "Хомяк",
      age: 1,
      from: "Жалал-Абад",
      img: "Animals/977-img_8805.jpeg",
      info: "Любит грызть",
    },
    {
      name: "Попугаи",
      age: 2,
      from: "Из магазина",
      img: "Animals/86.jpg",
      info: "Разговорчивые",
    },
    {
      name: "Волнистые попугаи",
      age: 3,
      from: "Из магазина",
      img: "Animals/ae3d5704eea1ea78bae1.jpg",
      info: "Шумные и весёлые",
    },
    {
      name: "Енот",
      age: 3,
      from: "Россия",
      img: "Animals/enot.jpg",
      info: "Обожает плотно поесть",
    },
    {
      name: "Пони",
      age: 4,
      from: "Чуй",
      img: "Animals/poni.jpg",
      info: "Добрый и маленький конь",
    },
    {
      name: "Еж",
      age: 2,
      from: "Кыргызстан",
      img: "Animals/ёж.jpg",
      info: "Тихий и колючий",
    },
    {
      name: "Заяц",
      age: 3,
      from: "Токтогул",
      img: "Animals/97281087.jpg",
      info: "Очень быстрый",
    },
    {
      name: "Сова",
      age: 5,
      from: "Кыргызстан",
      img: "Animals/сова.jpg",
      info: "Мудрая птица",
    },
    {
      name: "Волк",
      age: 5,
      from: "Кыргызстан",
      img: "Animals/6b.jpg",
      info: "Спокоеный, настороженый.",
    },
  ];
  const closeBtn = document.querySelector(".close-btn")
  const gallery = document.getElementById("gallery");
  const modalBg = document.getElementById("modalBg");
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const modalName = document.getElementById("modalName");
  const modalInfo = document.getElementById("modalInfo");
  const modalInfo1 = document.getElementById("modalInfo1");
  const modalInfo2 = document.getElementById("modalInfo2");
  animals.forEach((a) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<img src="${a.img}"><div class='card-name'>${a.name}</div>`;
    card.onclick = () => openModal(a);
    gallery.appendChild(card);
  });
  function openModal(a) {
    modalImg.src = a.img;
    modalName.textContent = a.name;
    modalInfo.textContent = `Возраст: ${a.age}`;
    modalInfo1.textContent = `Откуда: ${a.from}`;
    modalInfo2.textContent = `${a.info}`;
    modalBg.style.display = "flex";
  }
  closeBtn.onclick = () => (modalBg.style.display = "none");
  window.onclick = (e) => {
    if (e.target === modalBg) modalBg.style.display = "none";
  };
}

function page4init() {
  const revealElements = document.querySelectorAll(".scroll-reveal");
  const revealOnScroll = () => {
    for (let elem of revealElements) {
      const rect = elem.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        elem.classList.add("visible");
      }
    }
  };
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();
}

if (document.body.classList.contains("page1")) {
  page1init();
}
if (document.body.classList.contains("page2")) {
  page2init();
}
if (document.body.classList.contains("page3")) {
  page3init();
}
if (document.body.classList.contains("page4")) {
  page4init();
}
