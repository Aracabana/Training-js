function Slider(sliderWrapper) {
    this.sliderWrapper = sliderWrapper;
    this.sliderWidth = this.sliderWrapper.offsetWidth;
    this.createSliderIn = function() {
        let sliderIn = document.createElement('div');
        sliderIn.classList.add('slider-in');
        this.sliderWrapper.prepend(sliderIn);
    };
}

window.onload = function() {
    let slider = document.getElementById('slider');
    let sliderWidth = slider.offsetWidth;
    
    let sliderIn = document.createElement('div');
    sliderIn.classList.add('slider-in');
    slider.prepend(sliderIn);
    
    let slides = Array.from(document.getElementsByClassName('slide'));
    let slidesWidth = 0;
    let slideWidth;
    slides.forEach(function(item){
        slideWidth = item.offsetWidth;
        slidesWidth += slideWidth;
        item.style.width = sliderWidth + 'px';
        sliderIn.append(item);
    });
    sliderIn.style.width = slidesWidth + 'px';
    
    
    let buttonPrev = document.createElement('button');
    buttonPrev.classList.add('slider-button', 'slider-button-prev');
    buttonPrev.innerText = 'Prev slide';
    slider.append(buttonPrev);
    
    
    let buttonNext = document.createElement('button');
    buttonNext.classList.add('slider-button', 'slider-button-next');
    buttonNext.innerText = 'Next slide';
    slider.append(buttonNext);
    
    buttonPrev.addEventListener('click', showPrevSlide);
    buttonNext.addEventListener('click', showNextSlide);
    
    let sliderInTranslate = 0;
    function showPrevSlide() {
        sliderInTranslate -= slideWidth;
        sliderIn.style.transform = 'translateX(-' + sliderInTranslate + 'px)';
        //if (sliderInTranslate > 0) {
        //    buttonNext.removeAttribute('disabled');
        //    sliderIn.style.transform = 'translateX(-' + sliderInTranslate + 'px)';
        //} else {
        //    buttonPrev.setAttribute('disabled', true);
        //}
    }
    function showNextSlide() {
        sliderInTranslate += slideWidth;
        sliderIn.style.transform = 'translateX(-' + sliderInTranslate + 'px)';
        //if (sliderInTranslate < slidesWidth) {
        //    buttonPrev.removeAttribute('disabled');
        //    sliderIn.style.transform = 'translateX(-' + sliderInTranslate + 'px)';
        //} else {
        //    buttonNext.setAttribute('disabled', true);
        //}
    }
};
