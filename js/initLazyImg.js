
/*
*
*
*/
function initLazyImage(defaultImage) {
  let imgs = Array.from(document.querySelectorAll('[data-src]'));
  let timer = null;
  renderDefault();
  loadingImg();

  window.addEventListener('scroll', scrollEvent)

  function scrollEvent() {

    clearTimeout(timer);
    timer = setTimeout(() => {
      loadingImg();
      console.log(imgs.length);
    }, 160)


    if (imgs.length == 0) {
      window.removeEventListener('scroll', scrollEvent)
    }

  }
  // 渲染默认图片
  function renderDefault() {
    imgs.forEach((ele, index) => {
      ele.src = './image/default.jpg'
    })
  }

  // 懒加载需要加载的图片
  function loadingImg() {

    for (let i = 0; i < imgs.length; i++) {
      let imag = imgs[i];
      if (loadImg(imag)) {
        imgs.splice(i, 1)
        i--;
      }
    }

  }

  function loadImg(img) {
    let rect = img.getBoundingClientRect();
    if (rect.left < document.documentElement.clientWidth && rect.right > 0 &&
      rect.top < document.documentElement.clientHeight && rect.bottom > 0) {
      img.src = img.dataset['src'];
      return true;
    }
    return false;
  }

}