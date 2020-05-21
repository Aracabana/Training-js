function createNewElementAppend(element, elementParent, elementClasses) {
    let newElement = document.createElement(element);
    elementParent.appendChild(newElement);
    if (elementClasses) {
        newElement.classList.add(...elementClasses);
    }
    return newElement;
}
function createNewElementPrepend(element, elementParent, elementClasses) {
    let newElement = document.createElement(element);
    elementParent.prepend(newElement);
    if (elementClasses) {
        newElement.classList.add(...elementClasses);
    }
    return newElement;
}


function Slider() {
    let _sliderWrapper;
    let _sliderWrapperWidth = 0;
    let _slider;
    let _sliderWidth = 0;
    let _slides;
    let _slideWidth = 0;
    let _activeSlide;
    let _options = {
        slidesToShow: 1,
        slidesToScroll: 1,
        spaceBetweenSlides: 0,
        arrows: true,
        arrowPrev: '←',
        arrowNext: '→',
        firstSlideIndex: 0,
        loop: false
    };
    let translateValue = 0;
    const setOptions = function (options) {
        for (let key in options) {
            if (options.hasOwnProperty(key))  {
                for (let _key in _options) {
                    if (_options.hasOwnProperty(_key))  {
                        if (key === _key) {
                            _options[_key] = options[key];
                        }
                    }
                }
            }
        }
    };
    const setSlideWidth = function() {
        _slideWidth = (_sliderWrapperWidth - (_options.spaceBetweenSlides * (_options.slidesToShow - 1))) / _options.slidesToShow ;
        _slides.forEach((slide) => {
            slide.style.width = _slideWidth + 'px';
        })
    };
    const create = function() {
        _slider = createNewElementPrepend('div', _sliderWrapper, ['slider']);
        _slides.forEach((slide) => {
            _sliderWidth += slide.offsetWidth + _options.spaceBetweenSlides;
            if (_options.spaceBetweenSlides > 0) {
                slide.style.marginRight = _options.spaceBetweenSlides + 'px';
            }
            _slider.append(slide);
        })
        _slider.style.width = _sliderWidth + 'px';
    };
    const createArrows = function() {
        let arrowPrev = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-prev']);
        arrowPrev.innerHTML = _options.arrowPrev;
        if ((!_options.loop) && _options.firstSlideIndex === 0) {
            arrowPrev.setAttribute("disabled", true);
        }
        arrowPrev.addEventListener('click', function() {
            if (arrowNext.getAttribute('disabled')) {
                arrowNext.removeAttribute("disabled");
            }
            showPrevSlide();
            if ((!_options.loop) && translateValue >= 0) {
                this.setAttribute("disabled", true);
            }
        });
        let arrowNext = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-next']);
        arrowNext.innerHTML = _options.arrowNext;
        if ((!_options.loop) && _options.firstSlideIndex === _slides.length - 1) {
            arrowNext.setAttribute("disabled", true);
        }
        arrowNext.addEventListener('click', function() {
            if (arrowPrev.getAttribute('disabled')) {
                arrowPrev.removeAttribute("disabled");
            }
            showNextSlide();
            if ((!_options.loop) && translateValue <= -(_sliderWidth - _slideWidth)) {
                this.setAttribute("disabled", true);
            }
        });
    };
    const showPrevSlide = function () {
        translateValue += _slideWidth * _options.slidesToScroll;
        _slider.style.transform = 'translateX(' + translateValue + 'px)';
    };
    const showNextSlide = function () {
        translateValue -= _slideWidth * _options.slidesToScroll;
        _slider.style.transform = 'translateX(' + translateValue + 'px)';
    };
    
    
    this.init = function(sliderWrapper, options) {
        _sliderWrapper = document.querySelector(sliderWrapper);
        _sliderWrapperWidth = _sliderWrapper.offsetWidth;
        _slides = Array.from(_sliderWrapper.children);
        _activeSlide = _options.firstSlideIndex;
        _slides[_activeSlide].classList.add('slide-active');
        setOptions(options);
        setSlideWidth();
        create();
        if (_options.arrows) {
            createArrows();
        }
    };
}

let slider = new Slider().init('#slider', {
    // slidesToShow: 1,
    // slidesToScroll: 1,
    // spaceBetweenSlides: 0,
    // arrowPrev: '<span>Previous</span>',
    // arrowNext: '<span>Next</span>'
});
