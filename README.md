# CryptoClub – futtatható verzió (Firebase backend)

Ez a projekt a feltöltött csomagból készült, és a korábbi *base44* backend helyett **Firebase**-t használ.

## 1) Telepítés

```bash
npm install
npm run dev
```

## 2) Firebase beállítás

1. Firebase Console → **Create project**
2. Build → **Firestore Database** → Create database (test mode is ok fejlesztéshez)
3. Project Settings → **Your apps** → Web app → másold ki a `firebaseConfig` objektumot
4. Nyisd meg: `src/firebaseConfig.js` és **cseréld ki** a placeholder értékeket

Opció (kép feltöltés):
- Build → **Storage** → Get started.
- Ha nem állítod be, a képfeltöltés dataURL-re fog visszaesni (működik, de Firestore méretlimit miatt nagy képeknél nem ajánlott).

## 3) Gyűjtemények (collections)

A projekt ezeket a Firestore collectionöket használja:
- `products`
- `orders`
- `page_views`

Az **Admin / Termékek** oldalon tudsz termékeket létrehozni.

## 4) Firestore indexek

Ha a konzolban olyat látsz, hogy *The query requires an index*, akkor a Firebase ad egy "Create index" linket.
A webshop tipikusan ezeket a kombinációkat használja:
- products: where(is_active==true) + orderBy(created_date)
- products: where(is_active==true) + where(category==...) + orderBy(created_date)

## 5) Oldalak

- Webshop: `/` , `/products` , `/product?id=...` , `/cart` , `/checkout`
- Admin: `/admin` , `/admin/products` , `/admin/orders`

## 6) Firestore szabályok (csak fejlesztéshez)

> Élesben mindenképp szigoríts!

```js
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```
