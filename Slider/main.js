function Slider(sliderWrapper) {
    this.sliderWrapper = sliderWrapper;
    this.sliderWidth = this.sliderWrapper.offsetWidth;
    this.slides = Array.from(this.sliderWrapper.children);
    this.sliderIn = '';
    this.createSliderIn = function() {
        this.sliderIn = document.createElement('div');
        this.sliderIn.classList.add('slider-in');
        this.sliderWrapper.prepend(this.sliderIn);
        return this.sliderIn;
    };
    this.slidesWidth = 0;
    this.slideWidth = 0;
    // this.moveSlides = function() {
    //     const $this = this;
    //     this.slides.forEach(function(item) {
    //         $this.slideWidth = item.offsetWidth;
    //         $this.slidesWidth += $this.slideWidth;
    //         item.style.width = $this.sliderWidth + 'px';
    //         $this.sliderIn.append(item);
    //     });
    //     this.sliderIn.style.width = this.slidesWidth + 'px';
    // }
    
    this.moveSlides = function() {
        this.slides.forEach((item) => {
            this.slideWidth = item.offsetWidth;
            this.slidesWidth += this.slideWidth;
            item.style.width = this.sliderWidth + 'px';
            this.sliderIn.append(item);
        });
        this.sliderIn.style.width = this.slidesWidth + 'px';
    }
}

let sliderWrapper = document.getElementById('slider');
let slider = new Slider(sliderWrapper);
slider.createSliderIn();
slider.moveSlides();

/*window.onload = function() {
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
};*/
