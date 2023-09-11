export function detectScrollDown(callback: (result: boolean) => void): void {
  let lastScrollTop = 0; // Для контроля, что скролл идет вниз
  let isCallbackPending = false; // Флаг для отслеживания ожидающего вызова

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > lastScrollTop && !isCallbackPending) {
      if (
        // Сработает незадолго до конца страницы
        scrollTop + windowHeight >=
        documentHeight - 200
      ) {
        isCallbackPending = true;
        callback(true);

        // Задержка перед следующим вызовом
        setTimeout(() => {
          isCallbackPending = false;
        }, 1000); // Оптимальное значение
      }
    }

    lastScrollTop = scrollTop;
  });
}
