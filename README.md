# Real-Time Voting & Voice Communication 🗳️🔊

📢 **Gerçek Zamanlı Oylama ve Sesli İletişim Projesi**  
Bu proje, kullanıcıların gerçek zamanlı olarak **oy kullanmasını** ve **sesli iletişim kurmasını** sağlayan bir WebRTC ve WebSocket tabanlı bir uygulamadır.

## 📸 Ekran Görüntüsü 

### 🔹 **Ekran Görüntüsü**
![](Ekran görüntüsü 2025-02-26 192728.png)

![](Ekran görüntüsü 2025-02-26 192742.png)

## 🎥 Video
🔗 **Videoyu buradan izleyebilirsiniz:** [Video Linki](https://drive.google.com/file/d/1aEWtSVL8eF8ZqO9hKMqah9nBHJpTl82N/view?usp=sharing)


## 🚀 Özellikler
- ✅ **Gerçek zamanlı oylama (Yes/No/Maybe)**
- 🔊 **WebRTC ile sesli iletişim**
- 📡 **WebSocket (Socket.io) ile anlık veri aktarımı**
- 🎨 **Etkin kullanıcı arayüzü**
- 💾 **Oy geçmişini görüntüleme & sıfırlama**

## 🛠 Kurulum & Çalıştırma

Aşağıdaki adımları izleyerek projeyi lokal ortamda çalıştırabilirsiniz:

### 1️⃣ Gerekli Bağımlılıkları Kurun
Öncelikle, projenin bağımlılıklarını yüklemek için aşağıdaki komutu çalıştırın:

```bash
npm install express socket.io cors
npm install --save-dev nodemon

```
Express.js ile sunucuyu çalıştırmak için şu komutu kullanın:
```bash
node server.js 
```
## 📖 Kullanım Kılavuzu

1️⃣ **Web sitesine giriş yapın** (localhost:3000).  
2️⃣ **Sesli görüşme başlatmak için** "Start Call" butonuna tıklayın.  
3️⃣ **Oylama yapmak için** "Yes", "No" veya "Maybe" butonlarını kullanın.  
4️⃣ **Oylama geçmişini görmek için** aşağı kaydırın.  
5️⃣ **Çağrıyı sonlandırmak için** "End Call" butonuna tıklayın.  
6️⃣ **Oyları sıfırlamak için** "Reset Votes" butonunu kullanabilirsiniz.  

## 💻 Kullanılan Teknolojiler

| Teknoloji  | Açıklama  |
|------------|--------------|
| **Node.js** | Sunucu tarafında çalışıyor |
| **Express.js** | Backend framework |
| **Socket.io** | Gerçek zamanlı veri aktarımı |
| **WebRTC** | Sesli iletişim için |
| **HTML/CSS** | Arayüz tasarımı |
| **JavaScript (Vanilla JS)** | Frontend dinamikleri |

