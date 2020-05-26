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
    let _pagination;
    let _paginationBullets = [];
    let _paginationCounterCurrent;
    // let _paginationCounterDivider;
    // let _paginationCounterTotal;
    let _options = {
        slidesToShow: 1,
        slidesToScroll: 1,
        spaceBetweenSlides: 0,
        arrows: true,
        arrowPrev: '←',
        arrowNext: '→',
        firstSlideIndex: 0,
        activeSlideClassName: 'slide-active',
        activeBulletClassName: 'slider-pagination-bullet-active',
        loop: false,
        pagination: true,
        paginationType: 'counter', //'bullets'
        paginationCounterDivider: '/'
    };
    let _translateValueFormula;
    let _translateValue = 0;
    const setOptions = function (options) {
        for (let key in options) {
            if (options.hasOwnProperty(key)) {
                for (let _key in _options) {
                    if (_options.hasOwnProperty(_key)) {
                        if (key === _key) {
                            _options[_key] = options[key];
                        }
                    }
                }
            }
        }
    };
    const setSlideWidth = function () {
        _slideWidth = (_sliderWrapperWidth - (_options.spaceBetweenSlides * (_options.slidesToShow - 1))) / _options.slidesToShow;
        _slides.forEach((slide) => {
            slide.style.width = _slideWidth + 'px';
        })
    };
    const create = function () {
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
    const changeSlideClass = function (direction) {
        _slides[_activeSlide].classList.remove(_options.activeSlideClassName);
        if (_options.pagination && _options.paginationType === 'bullets') {
            _paginationBullets[_activeSlide].classList.remove(_options.activeBulletClassName);
        }
        if (direction === 'next') {
            _activeSlide += _options.slidesToScroll;
        } else {
            _activeSlide -= _options.slidesToScroll;
        }
        _slides[_activeSlide].classList.add(_options.activeSlideClassName);
        if (_options.pagination && _options.paginationType === 'bullets') {
            _paginationBullets[_activeSlide].classList.add(_options.activeBulletClassName);
        }
    };
    const showSlide = function () {
        _slider.style.transform = 'translateX(' + _translateValue + 'px)';
    };
    const createArrows = function () {
        _translateValueFormula = (_slideWidth + _options.spaceBetweenSlides) * _options.slidesToScroll;
        let arrowPrev = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-prev']);
        arrowPrev.innerHTML = _options.arrowPrev;
        if ((!_options.loop) && _options.firstSlideIndex === 0) {
            arrowPrev.setAttribute("disabled", true);
        }
        arrowPrev.addEventListener('click', function () {
            if (arrowNext.getAttribute('disabled')) {
                arrowNext.removeAttribute("disabled");
            }
            _translateValue += _translateValueFormula;
            changeSlideClass('prev');
            showSlide();
            if (_options.pagination && _options.paginationType === 'counter') {
                updateCounterPagination();
            }
            if ((!_options.loop) && _translateValue >= 0) {
                this.setAttribute("disabled", true);
            }
        });
        let arrowNext = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-next']);
        arrowNext.innerHTML = _options.arrowNext;
        if ((!_options.loop) && _options.firstSlideIndex === _slides.length - 1) {
            arrowNext.setAttribute("disabled", true);
        }
        arrowNext.addEventListener('click', function () {
            if (arrowPrev.getAttribute('disabled')) {
                arrowPrev.removeAttribute("disabled");
            }
            _translateValue -= _translateValueFormula;
            changeSlideClass('next');
            showSlide();
            if (_options.pagination && _options.paginationType === 'counter') {
                updateCounterPagination();
            }
            if ((!_options.loop) && _translateValue <= -(_sliderWidth - _slideWidth)) {
                this.setAttribute("disabled", true);
            }
        });
    };
    const createBulletsPagination = function () {
        _pagination = createNewElementAppend('ul', _sliderWrapper, ['slider-pagination']);
        for (let i = 0; i < _slides.length; i++) {
            let _paginationBullet = createNewElementAppend('li', _pagination, ['slider-pagination-bullet']);
            let _paginationBulletBtn = createNewElementAppend('button', _paginationBullet, ['slider-pagination-bullet-btn']);
            _paginationBulletBtn.innerText = i + 1;
            _paginationBulletBtn.addEventListener('click', function () {
                let _prevActiveSlide = _activeSlide;
                _paginationBullets[_activeSlide].classList.remove(_options.activeBulletClassName);
                _slides[_activeSlide].classList.remove(_options.activeSlideClassName);
                _activeSlide = i;
                _translateValueFormula = (_slideWidth + _options.spaceBetweenSlides) * Math.abs(_activeSlide - _prevActiveSlide);
                if (_prevActiveSlide < _activeSlide) {
                    _translateValue -= _translateValueFormula;
                } else if (_prevActiveSlide > _activeSlide) {
                    _translateValue += _translateValueFormula;
                }
                showSlide();
                this.parentElement.classList.add(_options.activeBulletClassName);
                _slides[_activeSlide].classList.add(_options.activeSlideClassName);
            });
            _paginationBullets.push(_paginationBullet);
        }
        _paginationBullets[_activeSlide].classList.add(_options.activeBulletClassName);
    };
    const createCounterPagination = function () {
        _pagination = createNewElementAppend('p', _sliderWrapper, ['slider-pagination']);
        _paginationCounterCurrent = createNewElementAppend('span', _pagination, ['slider-pagination-current']);
        updateCounterPagination();
        const _paginationCounterDivider = createNewElementAppend('span', _pagination, ['slider-pagination-divider']);
        _paginationCounterDivider.innerText = ' ' + _options.paginationCounterDivider + ' ';
        const _paginationCounterTotal = createNewElementAppend('span', _pagination, ['slider-pagination-total']);
        _paginationCounterTotal.innerText = _slides.length;
    }
    const updateCounterPagination = function () {
        _paginationCounterCurrent.innerText = _activeSlide + 1;
    };
    this.init = function (sliderWrapper, options) {
        _sliderWrapper = document.querySelector(sliderWrapper);
        _sliderWrapperWidth = _sliderWrapper.offsetWidth;
        _slides = Array.from(_sliderWrapper.children);
        setOptions(options);
        _activeSlide = _options.firstSlideIndex;
        _slides[_activeSlide].classList.add(_options.activeSlideClassName);
        setSlideWidth();
        create();
        if (_options.firstSlideIndex > 0 && _options.firstSlideIndex <= _slides.length - 1) {
            _translateValue -= (_slideWidth + _options.spaceBetweenSlides) * _options.firstSlideIndex;
            showSlide();
        }
        if (_options.arrows) {
            createArrows();
        }
        if (_options.pagination) {
            if (_options.paginationType === 'counter') {
                createCounterPagination();
            }
            if (_options.paginationType === 'bullets') {
                createBulletsPagination();
            }
        }
    };
}


