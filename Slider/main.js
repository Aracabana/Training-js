window.onload = function() {
    let slider = document.getElementById('slider');
    let sliderWidth = slider.offsetWidth;
    
    let sliderIn = document.createElement('div');
    sliderIn.classList.add('slider-in');
    slider.prepend(sliderIn);
    
    let slides = document.getElementsByClassName('slide');
    let slidesWidth = 0;
    let slideWidth;
    for (let i = 0; i < slides.length; i++) {
        slideWidth = slides[i].offsetWidth;
        slidesWidth += slideWidth;
        slides[i].style.width = sliderWidth + 'px';
        sliderIn.appendChild(slides[i]);
    }
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
        console.log(sliderInTranslate);
        sliderIn.style.transform = 'translateX(-' + sliderInTranslate + 'px)';
    }
    function showNextSlide() {
        sliderInTranslate += slideWidth;
        console.log(sliderInTranslate);
        sliderIn.style.transform = 'translateX(' + sliderInTranslate + 'px)';
    }
};
