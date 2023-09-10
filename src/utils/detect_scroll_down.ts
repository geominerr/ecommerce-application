export function detectScrollDown(callback: (result: boolean) => void): void {
  let lastScrollTop = 0; // Для контроля, что скролл идет вниз.

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    if (scrollTop > lastScrollTop) {
      if (
        // Сработает незадолго до конца страницы
        scrollTop + windowHeight >= documentHeight - 200 &&
        scrollTop + windowHeight <= documentHeight - 160
      ) {
        callback(true);
      }
    }

    lastScrollTop = scrollTop;
  });
}
