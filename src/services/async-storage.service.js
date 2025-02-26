import { saveToStorage } from "./util.service";

export const storageService = {
  query,
  get,
  post,
  put,
  remove,
};

let gPosts = [
  {
    _id: "s101",
    txt: "Lake trip with the best 🩷",
    imgUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
    createdAt: Date.now(),
    by: {
      _id: "u101",
      fullname: "sunflower_power77",
      imgUrl: "https://randomuser.me/api/portraits/women/67.jpg", // Random user avatar
    },
    loc: {
      lat: 39.0968,
      lng: -120.0324,
      name: "Lake Tahoe, California",
    },
    comments: [
      {
        id: "c1001",
        by: {
          _id: "u105",
          fullname: "Bob",
          imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        },
        txt: "good one!",
        likedBy: [
          {
            _id: "u105",
            fullname: "Bob",
            imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
          },
        ],
      },
      {
        id: "c1002",
        by: {
          _id: "u106",
          fullname: "Dob",
          imgUrl: "https://randomuser.me/api/portraits/men/6.jpg",
        },
        txt: "not good!",
      },
    ],
    likedBy: [
      {
        _id: "u105",
        fullname: "Bob",
        imgUrl: "https://randomuser.me/api/portraits/men/5.jpg",
      },
      {
        _id: "u106",
        fullname: "Dob",
        imgUrl: "https://randomuser.me/api/portraits/men/6.jpg",
      },
    ],
    tags: ["fun", "romantic"],
    views: 1200,
  },
  {
    _id: "s102",
    txt: "I'm a post demo",
    imgUrl: "https://as2.ftcdn.net/jpg/03/10/42/27/1000_F_310422728_gvGj4cxa8MZDbJOPws9MgQXUslt7jpxF.jpg", // Random aesthetic image
    createdAt: Date.now(),
    by: {
      _id: "u101",
      fullname: "sunflower_power77",
      imgUrl: "https://randomuser.me/api/portraits/women/67.jpg",
    },
    comments: [],
    likedBy: [],
    tags: ["fun", "romantic"],
    views: 800,
  },
];

function query(entityType, delay = 500) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || loadPosts();
  return new Promise((resolve) => setTimeout(() => resolve(entities), delay));
}

function loadPosts() {
  saveToStorage("post", gPosts);
  return gPosts;
}

function get(entityType, entityId) {
  return query(entityType).then((entities) => {
    const entity = entities.find((entity) => entity._id === entityId);
    if (!entity)
      throw new Error(
        `Get failed, cannot find entity with id: ${entityId} in: ${entityType}`
      );
    return entity;
  });
}

function post(entityType, newEntity) {
  newEntity._id = _makeId();
  return query(entityType).then((entities) => {
    entities.push(newEntity);
    _save(entityType, entities);
    return newEntity;
  });
}

function put(entityType, updatedEntity) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex(
      (entity) => entity._id === updatedEntity._id
    );
    if (idx < 0)
      throw new Error(
        `Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`
      );
    const entityToUpdate = { ...entities[idx], ...updatedEntity };
    entities.splice(idx, 1, entityToUpdate);
    _save(entityType, entities);
    return entityToUpdate;
  });
}

function remove(entityType, entityId) {
  return query(entityType).then((entities) => {
    const idx = entities.findIndex((entity) => entity._id === entityId);
    if (idx < 0)
      throw new Error(
        `Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`
      );
    entities.splice(idx, 1);
    _save(entityType, entities);
  });
}

// Private functions

function _save(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities));
}

function _makeId(length = 5) {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}
