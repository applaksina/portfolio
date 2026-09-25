"use strict";

/*
  Добавьте реальные адреса перед публикацией.
  Примеры формата:
  telegram: "https://t.me/username"
  max: "https://max.ru/username"
  email: "mailto:name@example.com"
  cv: "cv.pdf"

  Для cv положите PDF рядом с HTML-файлами либо укажите другой действительный путь.
*/
const contactLinks = {
  telegram: "",
  max: "",
  email: "",
  cv: ""
};

const contactMessages = {
  telegram: "Ссылка на Telegram пока не добавлена.",
  max: "Ссылка на MAX пока не добавлена.",
  email: "Адрес электронной почты пока не добавлен.",
  cv: "Файл CV пока не добавлен."
};

const notice = document.getElementById("contact-notice");
let noticeTimer;

function showNotice(message) {
  if (!notice) return;

  notice.textContent = message;
  notice.hidden = false;

  window.clearTimeout(noticeTimer);
  noticeTimer = window.setTimeout(() => {
    notice.hidden = true;
  }, 4000);
}

document.querySelectorAll("[data-contact]").forEach((button) => {
  button.addEventListener("click", () => {
    const type = button.dataset.contact;
    const destination = contactLinks[type];

    if (!destination) {
      showNotice(contactMessages[type]);
      return;
    }

    if (type === "cv") {
      const download = document.createElement("a");
      download.href = destination;
      download.download = destination.split("/").pop() || "cv.pdf";
      document.body.appendChild(download);
      download.click();
      download.remove();
      return;
    }

    if (type === "email") {
      window.location.href = destination;
      return;
    }

    window.open(destination, "_blank", "noopener,noreferrer");
  });
});

const gallery = document.querySelector("[data-gallery]");
const lightbox = document.querySelector("[data-lightbox]");

if (gallery && lightbox) {
  const slides = [
    { label: "[MOCKUP 1]", caption: "Главный экран проекта" },
    { label: "[MOCKUP 2]", caption: "Карта и показатели" },
    { label: "[MOCKUP 3]", caption: "Карточка региона" },
    { label: "[MOCKUP 4]", caption: "Сравнение данных" },
    { label: "[MOCKUP 5]", caption: "Табличный вид" },
    { label: "[MOCKUP 6]", caption: "Загрузка файлов" },
    { label: "[MOCKUP 7]", caption: "Прогноз показателей" }
  ];

  const imageLabel = gallery.querySelector("[data-gallery-label]");
  const caption = gallery.querySelector("[data-gallery-caption]");
  const dotsContainer = gallery.querySelector("[data-gallery-dots]");
  const lightboxLabel = lightbox.querySelector("[data-lightbox-label]");
  const lightboxCaption = lightbox.querySelector("[data-lightbox-caption]");
  const previousButton = gallery.querySelector("[data-gallery-previous]");
  const nextButton = gallery.querySelector("[data-gallery-next]");
  const openButton = gallery.querySelector("[data-gallery-open]");
  const closeButton = lightbox.querySelector("[data-lightbox-close]");

  let activeIndex = 0;

  slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "gallery__dot";
    dot.type = "button";
    dot.setAttribute("aria-label", `Показать макет ${index + 1}: ${slide.caption}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = Array.from(dotsContainer.children);

  function showSlide(index) {
    activeIndex = (index + slides.length) % slides.length;
    const slide = slides[activeIndex];

    imageLabel.textContent = slide.label;
    caption.textContent = slide.caption;
    lightboxLabel.textContent = slide.label;
    lightboxCaption.textContent = slide.caption;

    dots.forEach((dot, dotIndex) => {
      dot.setAttribute("aria-current", String(dotIndex === activeIndex));
    });
  }

  previousButton.addEventListener("click", () => showSlide(activeIndex - 1));
  nextButton.addEventListener("click", () => showSlide(activeIndex + 1));

  openButton.addEventListener("click", () => {
    lightbox.showModal();
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => {
    lightbox.close();
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => {
    openButton.focus();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && (lightbox.open || gallery.contains(document.activeElement))) {
      showSlide(activeIndex - 1);
    }

    if (event.key === "ArrowRight" && (lightbox.open || gallery.contains(document.activeElement))) {
      showSlide(activeIndex + 1);
    }
  });

  showSlide(0);
}
