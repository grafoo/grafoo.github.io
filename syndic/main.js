if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('svcwrk.js')
      .then(registration => {
        console.log(
          `service worker registered for scope ${registration.scope}`
        );
      })
      .catch(error => {
        console.log(`registering service worker failed with ${error}`);
      });
  });
}
