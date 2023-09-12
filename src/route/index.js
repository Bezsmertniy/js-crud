// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Product {
  static #list = []

  static #count = 0

  constructor(img, title, description, category, price) {
    this.id = ++Product.#count
    this.title = this.title
    this.img = img
    this.description = description
    this.category = category
    this.price = price
  }

  static add = (
    img,
    title,
    description,
    category,
    price,
  ) => {
    const newProduct = new Product(
      img,
      title,
      description,
      category,
      price,
    )

    this.#list.push(newProduct)
  }

  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((product) => product.id === id)
  }

  static getRandomList = (id) => {
    // Фільтруємо товар, щобвилучити той, з якимпорівнюємо id
    const filteredList = this.#list.filter(
      (product) => product.id !== id,
    )

    //   Відсортовуємо за додпомогою Math.random() та переміщаємо масив
    const shuffledList = filteredList.sort(
      () => Math.random() - 0.5,
    )

    //   Повертаємо перші 3 елементи з перемішаного масиву
    return shuffledList.slice(0, 3)
  }
}

Product.add(
  'http://picsum.photos/200/300',
  `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
  `AMD Ryzen 5 3600 (3.6 - 4.2 Ггц) / RAM 16 Гб / HDD 1 Тб + SSD 480 ГБ / nVidia GeForse RTX 3050, 8 ГБ / без ОД / LAN / без OC`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
)
Product.add(
  'http://picsum.photos/200/300',
  `Комп'ютер Asus AiO M3400WYAK-BA020M`,
  `AMD Ryzen 5 5625U (6 ядер / 12 потоків)/ RAM 8ГБ DDR4-3200 / SSD 512ГБ / AMD Radeon Vega 7 (448 конвеєрів )/ Wi-Fi / Bluetooth`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  27000,
)
Product.add(
  'http://picsum.photos/200/300',
  `Комп'ютер Lenovo IdeaCentre G5 Gaming 14IOB6`,
  `Intel Core i5-10400F (6 ядер / 12 потоків) / Intel B560 / 16GB DDR4 / 256GB SSD M.2 NVMe + 1TB HDD / GeForce GTX 1650 SUPER 4GB GDDR6 / Wi-Fi`,
  [
    { id: 1, text: 'Готовий до відправки' },
    { id: 2, text: 'Топ продажів' },
  ],
  2000,
)

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      img: 'http://picsum.photos/200/300',
      title: `Комп'ютер Artline Gaming (X43v31) AMD Ryzen 5 3600/`,
      description: `AMD Ryzen 5 3600 (3.6 - 4.2 Ггц) / RAM 16 Гб / HDD 1 Тб + SSD 480 ГБ / nVidia GeForse RTX 3050, 8 ГБ / без ОД / LAN / без OC`,
      category: [
        { id: 1, text: 'Готовий до відправки' },
        { id: 2, text: 'Топ продажів' },
      ],
      price: 27000,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('purchase-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'purchase-index',

    data: {
      list: Product.getList(),
    },
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================

// Підключаємо роутер до бек-енду
module.exports = router
