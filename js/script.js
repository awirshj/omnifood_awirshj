"use strict";
document.addEventListener("DOMContentLoaded", function () {
	// GENERAL VARIABLES

	const imgTargets = document.querySelectorAll("img[data-src]");
	const allSections = Array.from(document.getElementsByTagName("section"));
	const sectionHero = document.querySelector(".section__hero");
	/*remove hero section from all sections */
	allSections.splice(allSections.indexOf(sectionHero), 1);
	const footer = document.querySelector("footer");
	// btns
	const heroBtns = document.querySelector(
		".hero__text-container--inner .help--flex-row"
	);
	const howTabBtns = document.querySelector(".how__operations__tab--container");
	const mobileMenuOpen = document.querySelector(".nav--icon-open");
	console.log(mobileMenuOpen);
	const mobileMenuClose = document.querySelector(".btn__mobile--close");
	// labels
	const logo = Array.from(document.querySelectorAll(".nav__logo"));
	// section hero
	const mainNavLinks = document.querySelector(".main-nav__list-links");
	const header = document.querySelector(".header");
	const headerNav = document.querySelector(".header--nav");
	// section how
	const howTabTextBox = Array.from(
		document.querySelectorAll(".operations__content ")
	);
	// section testimonial
	const testCardSlides = document.querySelectorAll(".test__card-slide");
	const testCardSwapperRight = document.querySelector(
		".test__swapper-container-right"
	);
	const testCardSwapperLeft = document.querySelector(
		".test__swapper-container-left"
	);

	/// EVENT HANDLERS
	// sticky nav
	const stickyNavObs = new IntersectionObserver(
		(entries, observer) => {
			const [entry] = entries;
			!entry.isIntersecting
				? header.classList.add("header--sticky")
				: header.classList.remove("header--sticky");
		},
		{
			root: null,
			threshold: 0,
			rootMargin: `-${header.offsetHeight}px 0px 0px 0px`,
		}
	);
	stickyNavObs.observe(sectionHero);
	// smooth scrolling
	mainNavLinks.addEventListener("click", function (e) {
		e.preventDefault();
		// set correct targets
		if (
			!(
				e.target.closest(".main-nav__item") ||
				e.target.closest(".main-nav__item--btn")
			)
		)
			return;

		const sectionGo = document.querySelector(e.target.getAttribute("href"));
		// moderen way: maybe work on newer browsers
		sectionGo.scrollIntoView({ behavior: "smooth" });
		/*
		//old school way: work on all browsers

		const sectionGoCoords = sectionGo.getBoundingClientRect();
		window.scrollTo({
			top: window.pageYOffset + sectionGoCoords.top,
			left: window.pageXOffset + sectionGoCoords.left,
			behavior: "smooth",
		});
        */
	});
	heroBtns.addEventListener("click", function (e) {
		e.preventDefault();
		if (!(e.target.closest(".btn") || e.target.closest(".hero__btn"))) return;
		const sectionGo = document.querySelector(e.target.getAttribute("href"));
		sectionGo.scrollIntoView({ behavior: "smooth" });
	});
	logo.forEach((logo) => {
		logo.addEventListener("click", function (e) {
			e.preventDefault();
			sectionHero.scrollIntoView({ behavior: "smooth" });
		});
	});

	// reveal sections
	const revealSectionsObs = new IntersectionObserver(
		(entries, observe) => {
			const [entry] = entries;
			if (!entry.isIntersecting) return;
			entry.target.classList.remove("section--hidden");
			observe.unobserve(entry.target);
		},
		{ root: null, threshold: [0.1, 0.2] }
	);
	allSections.forEach((sect) => {
		sect.classList.add("section--hidden");
		revealSectionsObs.observe(sect);
	});
	revealSectionsObs.observe(footer);

	// mobile nav(hamburger menu)
	mobileMenuOpen.addEventListener("click", function () {
		headerNav.classList.remove("mobile--nav-hidden");
	});
	mobileMenuClose.addEventListener("click", function () {
		headerNav.classList.add("mobile--nav-hidden");
	});
	// lazy loading img
	const imgLoadFn = (entries, observer) => {
		const [entry] = entries;
		console.log(entry);
		if (!entry.isIntersecting) return;
		entry.target.src = entry.target.dataset.src;
		entry.target.addEventListener("load", function () {
			entry.target.classList.remove("lazy-img");
		});
		observer.unobserve(entry.target);
	};
	const imgLoadObs = new IntersectionObserver(
		imgLoadFn,
		// [0, 0.1, 0.25, 0.5, 1] because of revealing sections
		{ root: null, threshold: [0, 0.1, 0.25, 0.5, 1] }
	);
	imgTargets.forEach((img) => imgLoadObs.observe(img));
	// section how: operator(slider)
	howTabBtns.addEventListener("click", function (e) {
		if (!e.target.closest(".operations__tab")) return;
		// stepNum is zero based
		const stepNum = Number(e.target.closest(".btn").dataset.step);
		// style tap btn
		howTabBtns.querySelectorAll(".operations__tab").forEach((tab, i) => {
			i === stepNum
				? tab.classList.add("operations__tab--active")
				: tab.classList.remove("operations__tab--active");
		});
		//  show active tab(content)
		howTabTextBox.forEach((tab, i) =>
			i === stepNum
				? tab.classList.add("operations__content--active")
				: tab.classList.remove("operations__content--active")
		);
	});

	// section testimonial: operator(slider)
	const testSliderFn = function () {
		let activeIndex;
		let nextSlide;
		// type = right or left.
		this === "Right" ? (nextSlide = 2) : (nextSlide = 4);
		// test__card-slide--1
		testCardSlides.forEach((slide, i) => {
			slide.classList.contains("test__card--active") ? (activeIndex = i) : "";
		});
		testCardSlides.forEach((slide, i) => {
			if (slide.classList.contains(`test__card-slide--${nextSlide}`)) {
				slide.classList.remove(`test__card-slide--${nextSlide}`);
				// active next slide
				slide.classList.add(`test__card-slide--1`);
				slide.classList.add("test__card--active");
			} else if (slide.classList.contains(`test__card-slide--3`)) {
				slide.classList.remove(`test__card-slide--3`);
				slide.classList.add(
					`test__card-slide--${3 + (nextSlide === 2 ? -1 : 1)}`
				);
			} else if (
				slide.classList.contains(`test__card-slide--${nextSlide === 2 ? 4 : 2}`)
			) {
				slide.classList.remove(`test__card-slide--${nextSlide === 2 ? 4 : 2}`);
				slide.classList.add(`test__card-slide--3`);
			}
			if (activeIndex === i) {
				slide.classList.remove("test__card-slide--1");
				slide.classList.remove("test__card--active");
				[2, 4].forEach((num) =>
					num === nextSlide
						? ""
						: slide.classList.add(`test__card-slide--${num}`)
				);
			}
		});
	};
	testCardSwapperRight.addEventListener("click", testSliderFn.bind("Right"));
	testCardSwapperLeft.addEventListener("click", testSliderFn.bind("left"));
});
