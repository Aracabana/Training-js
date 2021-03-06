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
    let _slidesCount = 0;
    let _slideWidth = 0;
    let _slideOuterWidth = 0;
    let _activeSlide;
    let _prevActiveSlide = 0;
    let _pagination;
    let _paginationBullets = [];
    let _paginationCounterCurrent;
    let _updatePagination;
    let _paginationIndex = 0;
    let _prevPaginationIndex = 0;
    let _bulletsCount = 0;
    let arrowPrev;
    let arrowNext;
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
        _slideOuterWidth = _slideWidth + _options.spaceBetweenSlides;
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
        });
        _slider.style.width = _sliderWidth + 'px';
    };
    const changeActiveSlide = function (slideIndex) {
        _prevActiveSlide = _activeSlide;
        _activeSlide = slideIndex;
        changeSlideClass();
        if (_options.pagination) {
            _updatePagination();
        }
        if (!_options.loop) {
            updateArrows();
        }
    };
    const changeSlideClass = function () {
        _slides[_prevActiveSlide].classList.remove(_options.activeSlideClassName);
        _slides[_activeSlide].classList.add(_options.activeSlideClassName);
    };
    const showSlide = function () {
        _slider.style.transform = 'translateX(' + _translateValue + 'px)';
    };
    const createArrows = function () {
        let data = {slideIndex: 0}
        
        arrowPrev = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-prev']);
        arrowPrev.innerHTML = _options.arrowPrev;
        if ((!_options.loop) && _options.firstSlideIndex === 0) {
            arrowPrev.disabled = true;
        }
        arrowPrev.addEventListener('click', function () {
            // _prevPaginationIndex = _paginationIndex;
            // _paginationIndex -= 1;
            // const array = Array.from({length: _slidesCount}).map(x => 0);
            // array.splice(_activeSlide);
            // if (array.length < _options.slidesToShow) {
            //     _translateValue += _slideOuterWidth * array.length;
            //     slideIndex = _activeSlide - array.length;
            // } else {
            //     _translateValue += _slideOuterWidth * _options.slidesToScroll;
            //     slideIndex = _activeSlide - _options.slidesToScroll;
            // }
            calculateTranslate(true, data);
            changeActiveSlide(data.slideIndex);
            showSlide();
        });
        
        arrowNext = createNewElementAppend('button', _sliderWrapper, ['slider-arrow', 'slider-arrow-next']);
        arrowNext.innerHTML = _options.arrowNext;
        if ((!_options.loop) && _options.firstSlideIndex === _slidesCount - 1) {
            arrowNext.setAttribute("disabled", true);
        }
        arrowNext.addEventListener('click', function () {
            // _prevPaginationIndex = _paginationIndex;
            // _paginationIndex += 1;
            // const array = Array.from({length: _slidesCount}).map(x => 0);
            // array.splice(0, _activeSlide + _options.slidesToShow);
            // console.log(array);
            // if (array.length < _options.slidesToShow) {
            //     _translateValue -= _slideOuterWidth * array.length;
            //     slideIndex = _activeSlide + array.length;
            // } else {
            //     _translateValue -= _slideOuterWidth * _options.slidesToScroll;
            //     slideIndex = _activeSlide + _options.slidesToScroll;
            // }
            calculateTranslate(false, data);
            changeActiveSlide(data.slideIndex);
            showSlide();
        });
    };
    const calculateTranslate = function (arrowIsLeft, data) {
        const sign = arrowIsLeft ? 1 : -1;
        _prevPaginationIndex = _paginationIndex;
        _paginationIndex += (arrowIsLeft) ? -1 : 1;
        if(_options.slidesToScroll > 1) {
            const array = Array.from({length: _slidesCount}).map(x => 0);
            (arrowIsLeft) ? array.splice(_activeSlide) : array.splice(0, _activeSlide + _options.slidesToShow);
            const slideCount = array.length;
            if (slideCount < _options.slidesToShow) {
                _translateValue += (_slideOuterWidth * slideCount) * sign;
                data.slideIndex = _activeSlide - (slideCount * sign);
            }
            else if(slideCount === _options.slidesToShow) {
                if (_options.slidesToShow < _options.slidesToScroll) {
                    _translateValue += (_slideOuterWidth * slideCount) * sign;
                    data.slideIndex = _activeSlide - (slideCount * sign);
                }
                else {
                    _translateValue += _slideOuterWidth * _options.slidesToScroll * sign;
                    data.slideIndex = _activeSlide - (_options.slidesToScroll * sign);
                }
            }
            else {
                _translateValue += _slideOuterWidth * _options.slidesToScroll * sign;
                data.slideIndex = _activeSlide - (_options.slidesToScroll * sign);
            }
            return 0;
        }
        _translateValue += _slideOuterWidth * _options.slidesToScroll * sign;
    }
    const updateArrows = function () {
        arrowPrev.disabled = _paginationIndex === 0;
        if (_options.slidesToScroll > 1) {
            arrowNext.disabled = _paginationIndex === Math.floor((_slidesCount - 1) / _options.slidesToScroll);
        } else {
            arrowNext.disabled = _paginationIndex === _slidesCount - _options.slidesToShow;
        }
    }
    const createBulletsPagination = function () {
        let slideIndex = 0;
        _pagination = createNewElementAppend('ul', _sliderWrapper, ['slider-pagination']);
        for (let i = 0; i < _bulletsCount; i++) {
            let _paginationBullet = createNewElementAppend('li', _pagination, ['slider-pagination-bullet']);
            let _paginationBulletBtn = createNewElementAppend('button', _paginationBullet, ['slider-pagination-bullet-btn']);
            _paginationBulletBtn.innerText = i + 1;
            _paginationBulletBtn.addEventListener('click', function () {
                _prevPaginationIndex = _paginationIndex;
                _paginationIndex = i;
                let _translateValueFormula = _slideOuterWidth * (Math.abs(_paginationIndex - _prevPaginationIndex) * _options.slidesToScroll);
                if(_prevPaginationIndex < _paginationIndex) { // prev
                    slideIndex = _paginationIndex * _options.slidesToScroll
                    _translateValue -= _translateValueFormula;
                }
                if (_prevPaginationIndex > _paginationIndex) { // next
                    slideIndex = _paginationIndex * _options.slidesToScroll;
                    _translateValue += _translateValueFormula;
                }
                changeActiveSlide(slideIndex);
                showSlide();
            });
            _paginationBullets.push(_paginationBullet);
        }
        _paginationBullets[_activeSlide].classList.add(_options.activeBulletClassName);
    };
    const updateBulletsPagination = function () {
        _paginationBullets[_prevPaginationIndex].classList.remove(_options.activeBulletClassName);
        _paginationBullets[_paginationIndex].classList.add(_options.activeBulletClassName);
    };
    const createCounterPagination = function () {
        _pagination = createNewElementAppend('p', _sliderWrapper, ['slider-pagination']);
        _paginationCounterCurrent = createNewElementAppend('span', _pagination, ['slider-pagination-current']);
        updateCounterPagination();
        const _paginationCounterDivider = createNewElementAppend('span', _pagination, ['slider-pagination-divider']);
        _paginationCounterDivider.innerText = ' ' + _options.paginationCounterDivider + ' ';
        const _paginationCounterTotal = createNewElementAppend('span', _pagination, ['slider-pagination-total']);
        _paginationCounterTotal.innerText = _slidesCount;
    };
    const updateCounterPagination = function () {
        _paginationCounterCurrent.innerText = _activeSlide + 1;
    };
    
    this.init = function (sliderWrapper, options) {
        _sliderWrapper = document.querySelector(sliderWrapper);
        _sliderWrapperWidth = _sliderWrapper.offsetWidth;
        _slides = Array.from(_sliderWrapper.children);
        _slidesCount = _slides.length;
        setOptions(options);
        _activeSlide = _options.firstSlideIndex;
        _slides[_activeSlide].classList.add(_options.activeSlideClassName);
        setSlideWidth();
        create();
        if (_options.firstSlideIndex > 0 && _options.firstSlideIndex <= _slidesCount - 1) {
            _translateValue -= _slideOuterWidth * _options.firstSlideIndex;
            showSlide();
        }
        if (_options.arrows) {
            createArrows();
        }
        if (_options.pagination) {
            if(_options.slidesToScroll === 1) {
                _bulletsCount = Math.floor(_slidesCount / _options.slidesToScroll) - (_options.slidesToShow - _options.slidesToScroll);
            } else {
                console.log(_slidesCount)
                _bulletsCount = Math.round(_slidesCount / _options.slidesToScroll);
            }
            if (_options.paginationType === 'counter') {
                createCounterPagination();
                _updatePagination = updateCounterPagination;
            }
            if (_options.paginationType === 'bullets') {
                createBulletsPagination();
                _updatePagination = updateBulletsPagination;
            }
        }

    };
}


