self.addEventListener("install", function (e) {
    self.skipWaiting();
  });
   
  self.addEventListener("activate", function (e) {
  });
// 알림 수신 후 표시
  self.addEventListener("push", function (e) {
    if (!e.data.json()) return;
   
    const resultData = e.data.json().notification;
    const notificationTitle = resultData.title;
    const notificationOptions = {
      body: resultData.body,
      icon: resultData.image,
      tag: resultData.tag,
      ...resultData,
    };
   
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
// 알림 클릭 시 창 열기   
  self.addEventListener("notificationclick", function (event) {
    const url = "/";
    event.notification.close();
    event.waitUntil(clients.openWindow(url));
  });
  