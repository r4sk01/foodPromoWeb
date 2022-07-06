window.addEventListener("DOMContentLoaded", () => {
  // Tabs Content

  const tabs = document.querySelectorAll(".tabheader__item"),
    tabsContent = document.querySelectorAll(".tabcontent"),
    tabsParent = document.querySelector(".tabheader__items");

  function hideTabContent() {
    tabsContent.forEach((item) => {
      item.classList.remove("show", "fade");
      item.classList.add("hide");
    });

    tabs.forEach((item) => {
      item.classList.remove("tabheader__item_active");
    });
  }

  function showTabContent(i = 0) {
    tabsContent[i].classList.remove("hide");
    tabsContent[i].classList.add("show", "fade");
    tabs[i].classList.add("tabheader__item_active");
  }

  // initial init
  hideTabContent();
  showTabContent();

  tabsParent.addEventListener("click", (event) => {
    if (event.target && event.target.matches("div.tabheader__item")) {
      tabs.forEach((item, i) => {
        if (event.target == item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });

  // Timer
  let dt = new Date();
  // set deadline 7 days ahead from today
  let timeSt = dt.setDate(dt.getDate() + 7);
  let fullDt = new Date(timeSt);
  // format like 2022-07-07
  let deadline = fullDt.toLocaleDateString("sv");
  console.log(deadline);

  function getTimeRemaining(endtime) {
    let days, seconds, minutes, hours;
    const t = Date.parse(endtime) - Date.parse(new Date());

    if (t <= 0) {
      days = 0;
      hours = 0;
      minutes = 0;
      seconds = 0;
    } else {
      days = Math.floor(t / (1000 * 60 * 60 * 24));
      seconds = Math.floor((t / 1000) % 60);
      minutes = Math.floor((t / 1000 / 60) % 60);
      hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    }

    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function getZero(num) {
    if (num >= 0 && num < 10) {
      return "0" + num;
    } else {
      return num;
    }
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector),
      days = timer.querySelector("#days"),
      hours = timer.querySelector("#hours"),
      minutes = timer.querySelector("#minutes"),
      seconds = timer.querySelector("#seconds"),
      timeInterval = setInterval(updateClock, 1000);

    updateClock();

    function updateClock() {
      const t = getTimeRemaining(endtime);

      days.innerHTML = getZero(t.days);
      hours.innerHTML = getZero(t.hours);
      minutes.innerHTML = getZero(t.minutes);
      seconds.innerHTML = getZero(t.seconds);

      if (t.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock(".timer", deadline);

  // Open and Close Promotion Modal Window

  const modalOpenBtns = document.querySelectorAll("[data-modal]"),
    modal = document.querySelector(".modal"),
    modalCloseBtn = document.querySelector("[data-close]");

  function openModal() {
    modal.classList.add("show");
    modal.classList.remove("hide");
    //modal.classList.toggle("show");
    // do not allow scrool when modal is up
    document.body.style.overflow = "hidden";
    clearInterval(modalTimerId);
  }

  function closeModal() {
    modal.classList.add("hide");
    modal.classList.remove("show");
    //modal.classList.toggle("show");
    // turn back scroll
    document.body.style.overflow = "";
  }

  modalOpenBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });

  modalCloseBtn.addEventListener("click", () => {
    closeModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Escape" && modal.classList.contains("show")) {
      closeModal();
      document.removeEventListener("scroll", showModalByScroll);
    }
  });

  // call modal window after 10 secs

  const modalTimerId = setTimeout(openModal, 10000);

  function showModalByScroll() {
    if (
      window.pageYOffset + document.documentElement.clientHeight >=
      document.documentElement.scrollHeight
    ) {
      openModal();
      window.removeEventListener("scroll", showModalByScroll);
    }
  }
  window.addEventListener("scroll", showModalByScroll);

  // Adding Classes for cards
  class MenuCard {
    constructor(
      imgSrc,
      altImgSrc,
      header,
      description,
      price,
      parentSelector,
      ...classes
    ) {
      this.imgSrc = imgSrc;
      this.altImgSrc = altImgSrc;
      this.header = header;
      this.description = description;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 53;
      this.changeToRub();
    }

    changeToRub() {
      this.price = this.price * this.transfer;
    }

    renderCard(parent) {
      const element = document.createElement("div");
      if (this.classes.length === 0) {
        this.element = "menu__item";
        element.classList.add(this.element);
      } else {
        this.classes.forEach((className) => element.classList.add(className));
      }
      element.innerHTML = `
            <img src=${this.imgSrc} alt=${this.altImgSrc} />
            <h3 class="menu__item-subtitle">${this.header}</h3>
            <div class="menu__item-descr">
              ${this.description}
            </div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
              <div class="menu__item-cost">Цена:</div>
              <div class="menu__item-total"><span>${this.price}</span> руб/день</div>
            </div>
      `;

      this.parent.append(element);
    }
  }
  const card01 = new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    15,
    ".menu__field .container"
  );
  const card02 = new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Меню “Премиум”",
    "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
    25,
    ".menu__field .container"
  );
  const card03 = new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Меню “Постное”",
    "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофуи импортных вегетарианских стейков.",
    10,
    ".menu__field .container"
  );
  card01.renderCard();
  card02.renderCard();
  card03.renderCard();
  //test
});
