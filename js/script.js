"use strict";
document.addEventListener("DOMContentLoaded", function () {
	// GENERAL VARIABLES
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
	// labels
	const logo = Array.from(document.querySelectorAll(".nav__logo"));
	// section hero
	const mainNavLinks = document.querySelector(".main-nav__list-links");
	const header = document.querySelector(".header");
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
			console.log(entry.isIntersecting);
			entry.target.classList.remove("section--hidden");
			observe.unobserve(entry.target);
		},
		{ root: null, threshold: 0.17 }
	);
	allSections.forEach((sect) => {
		sect.classList.add("section--hidden");
		revealSectionsObs.observe(sect);
	});
	revealSectionsObs.observe(footer);
	// section how: operator(slider)
	howTabBtns.addEventListener("click", function (e) {
		if (!e.target.closest(".operations__tab")) return;
		// stepNum is zero based
		const stepNum = Number(e.target.closest(".btn").dataset.step);
		// style tap
		howTabBtns.querySelectorAll(".operations__tab").forEach((tab, i) => {
			i === stepNum
				? tab.classList.add("operations__tab--active")
				: tab.classList.remove("operations__tab--active");
		});
		//  show active tab
		howTabTextBox.forEach((tab, i) =>
			i === stepNum
				? tab.classList.add("operations__content--active")
				: tab.classList.remove("operations__content--active")
		);
	});
	// section testimonial: operator(slider)
	testCardSwapperRight.addEventListener("click", function (e) {
		let activeIndex;
		let slideNum;
		// test__card-slide--1
		testCardSlides.forEach((slide, i, arr) => {
			slide.classList.contains("test__card--active") ? (activeIndex = i) : "";
			slide.classList.contains("test__card--active")
				? (slideNum = slide.dataset.slide)
				: "";
			console.log(slide);
		});
		testCardSlides.forEach((slide, i, arr) => {
			if (activeIndex === i) {
				slide.classList.remove("test__card-slide--1");
				slide.classList.remove("test__card--active");
				slide.classList.add("test__card-slide--4");
			} else if (slide.classList.contains("test__card-slide--4")) {
				slide.classList.remove("test__card-slide--4");
				slide.classList.add("test__card-slide--3");
			} else if (slide.classList.contains("test__card-slide--3")) {
				slide.classList.remove("test__card-slide--3");
				slide.classList.add("test__card-slide--2");
			} else if (slide.classList.contains("test__card-slide--2")) {
				slide.classList.remove("test__card-slide--2");
				slide.classList.add("test__card-slide--1");
				slide.classList.add("test__card--active");
			}
		});
	});
	testCardSwapperLeft.addEventListener("click", function (e) {
		let activeIndex;
		// test__card-slide--1
		testCardSlides.forEach((slide, i, arr) => {
			slide.classList.contains("test__card--active") ? (activeIndex = i) : "";
		});
		testCardSlides.forEach((slide, i, arr) => {
			if (activeIndex === i) {
				slide.classList.remove("test__card-slide--1");
				slide.classList.remove("test__card--active");
				slide.classList.add("test__card-slide--2");
			} else if (slide.classList.contains("test__card-slide--4")) {
				slide.classList.remove("test__card-slide--4");
				slide.classList.add("test__card-slide--1");
				slide.classList.add("test__card--active");
			} else if (slide.classList.contains("test__card-slide--3")) {
				slide.classList.remove("test__card-slide--3");
				slide.classList.add("test__card-slide--4");
			} else if (slide.classList.contains("test__card-slide--2")) {
				slide.classList.remove("test__card-slide--2");
				slide.classList.add("test__card-slide--3");
			}
		});
	});
});
