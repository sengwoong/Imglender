// 이미지 로딩을 위한 lazyLoad() 함수 생성

function lazyLoad() {
  // HTML에서 모든 lazy 클래스를 찾아서 배열로 저장
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  // 로딩이 진행 중인지를 나타내는 active 변수
  let active = false;

  // 이미지를 로딩하는 함수
  const lazyLoadImages = function () {
    // 로딩이 진행 중인 경우 함수를 실행하지 않음
    if (active === false) {
      active = true;
      setTimeout(() => {
        // lazyImages 배열에서 화면에 나타난 이미지만 필터링
        lazyImages = lazyImages
          .map((lazyImage) => {
            if (
              lazyImage.getBoundingClientRect().top <= window.innerHeight &&
              window.getComputedStyle(lazyImage).display !== "none"
            ) {
              // 화면에 나타난 이미지의 src 속성을 data-src 속성으로 변경
              lazyImage.src = lazyImage.dataset.src;
              // lazy 클래스를 제거하여 이미지를 로드하도록 함
              lazyImage.classList.remove("lazy");
              return null;
            } else {
              // 화면에 나타나지 않은 이미지는 배열에 그대로 유지
              return lazyImage;
            }
          })
          .filter((image) => image); // null 값이 아닌 이미지만 필터링하여 새로운 배열 생성
        // 모든 이미지를 로딩한 경우 scroll, resize, orientationchange 이벤트 리스너 제거
        if (!lazyImages.length) {
          document.removeEventListener("scroll", lazyLoad);
          window.removeEventListener("resize", lazyLoad);
        } else {
          // 아직 로딩되지 않은 이미지가 남아있는 경우 active 변수를 false로 변경하여 다시 로딩할 수 있도록 함
          active = false;
        }
      }, 400);
    }
  };

  // 최초로 함수 한번 실행
  lazyLoadImages();

  // 스크롤, 창 크기 변경, orientation 변경 이벤트 발생 시 lazyLoadImages() 함수 실행
  document.addEventListener("scroll", lazyLoadImages);
  window.addEventListener("resize", lazyLoadImages);
}

// DOMContentLoaded 이벤트 발생 시 lazyLoad() 함수 실행
document.addEventListener("DOMContentLoaded", lazyLoad);
