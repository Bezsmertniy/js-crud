// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================
class Track {
  // Статичне приватне поле для зберігання списку об'єктів Track
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генерує випадкове id
    this.name = name
    this.author = author
    this.image = image
  }

  // Статичний метод для створення об'єктів Track і додавання його до списку #list
  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }
  // Статичний метод для отримання всього списку треків
  static getList() {
    return this.#list.reverse()
  }
}

Track.create(
  'Старі фотографії',
  'Монатік',
  'http://picsum.photos/100/100',
)
Track.create(
  '#Пошта',
  'Jerry Heil',
  'http://picsum.photos/100/100',
)
Track.create(
  'Сонячна',
  'Kalush',
  'http://picsum.photos/100/100',
)
Track.create(
  'Stefania',
  'Kalush Orchestra ',
  'http://picsum.photos/100/100',
)
Track.create(
  '2Step',
  'Ed Sheeran feat. Antytila',
  'http://picsum.photos/100/100',
)

console.log(Track.getList())

class Playlist {
  // Статичне приватне поле для зберігання об'єктів Playlist
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000) // Генерує випадкове id
    this.name = name
    this.track = []
  }

  // Статичний метод для створення об'єкту Playlist і додавання його до списку #list
  static create(name) {
    const newPlaylist = new Playlist(name)
    this.#list.push(newPlaylist)
    return newPlaylist
  }

  // Статичний метод для отримання всього списку плейлистів
  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    playlist.tracks.push(...randomTracks)
  }

  static getById(id) {
    return (
      Playlist.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
  }
}
// ================================================================
// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-choose',

    data: {},
  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================
router.get('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  res.render('spotify-create', {
    style: 'spotify-create',

    data: {
      isMix,
    },
  })
})

router.post('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix

  const name = req.body.name

  if (!name) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Введіть назву плейліста',
        link: isMix
          ? `/spotify-create?isMix=true`
          : '/spotify-create',
      },
    })
  }

  const playlist = Playlist.create(name)

  if (isMix) {
    Playlist.makeMix(playlist)
  }

  console.log(playlist)

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)

  const playlist = Playlist.getById(id)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: '/',
      },
    })
  }
})

router.get('/spotify-track-delete', function (req, res) {
  const playlistId = Number(req.query.playlistId)
  const trackId = Number(req.query.trackId)

  const playlist = Playlist.getById(playlistId)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?=${playlistId}`,
      },
    })
  }

  playlist.deleteTrackById(trackId)

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

// Підключаємо роутер до бек-енду
module.exports = router
