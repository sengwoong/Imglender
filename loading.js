class PlayLoadingForImage {
  constructor(imgloadingClass, imgSelectClass) {
    this.imgloading = imgloading;
    this.imgSelect = imgSelect;
    this.isLoading = true;
  }

  toggleLoading() {
    const elements = document.querySelectorAll(this.imgSelect);
    for (const el of elements) {
      el.style.display = this.isLoading ? "block" : "none";
    }
  }

  loadImage(src) {
    this.toggleLoading();

    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = src;
      img.addEventListener("load", () => {
        setTimeout(() => {
          resolve();
          this.isLoading = false;
          this.toggleLoading();
        }, 2000);
      });
    });
  }

  playLoading() {
    const images = document.querySelectorAll(this.imgloading);

    images.forEach((img) => {
      this.loadImage(img.dataset.src).then(() => {
        img.src = img.dataset.src;
      });
    });
  }
}

const imgloading = ".cardWrap img";
const imgSelect = ".cardWrap .loading";

document.addEventListener("DOMContentLoaded", () => {
  const playLoading = new PlayLoadingForImage(imgloading, imgSelect);
  playLoading.playLoading();
});
