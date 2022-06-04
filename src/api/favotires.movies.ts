import { Result } from "../interfaces/redux.interface";

export const addFavoriteMovie = (movie: Result) => {
  if (getItems().length > 0) {
    const cartsItems: Result[] = getItems();
    cartsItems.push(movie);
    localStorage.setItem("movies", JSON.stringify(cartsItems));

    return;
  }
  localStorage.setItem("movies", JSON.stringify([movie]));
};

export function getItems(): [] {
  return JSON.parse(localStorage.getItem("movies") || "[]");
}

export function removeMovie(movie: Result) {
  if (getItems()) {
    const cartsItems: Result[] = getItems();
    const fnd = cartsItems.find((a) => a.id === movie.id);
    if (fnd) {
      const index = cartsItems.indexOf(fnd);
      cartsItems.splice(index, 1);
    }
    localStorage.setItem("movies", JSON.stringify(cartsItems));
  }
  return;
}

export const isFavorite = (movie: Result) => {
  if (getItems()) {
    const cartsItems: Result[] = getItems();
    const fnd = cartsItems.find((a) => a.id === movie.id);
    if (fnd) {
      return true;
    }
    return false;
  }
};
