import * as flsFunctions from "./modules/functions.js";

flsFunctions.isWebp();

// image background------------------------------------
function ibg() {

	let ibg = document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}

ibg();
// ---------------------------------------------------


//appearance animation ====================================================
//всі елементи, котрі анімуютьсья при скролі
let animatedItems = document.querySelectorAll('.anim-item');

function offset(el) {
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

if (animatedItems.length > 0) {
	window.addEventListener('scroll', animOnScroll);

	function animOnScroll() {
		animatedItems.forEach(item => {
			const itemHeight = item.offsetHeight;
			const itemOffset = offset(item).top;
			//коли видно чверть елемента
			const animStart = 4;

			let itemPoint = window.innerHeight - itemHeight / animStart;

			if (itemHeight > window.innerHeight) {
				itemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > itemOffset - itemPoint) && scrollY < (itemOffset + itemHeight)) {
				item.classList.add('animated');
				// if (numberElements) {
				// 	growNumbers();
				// }
			} else {
				//клас no-re-animation у елементів, котрі повторно не анімуються
				if (!item.classList.contains('no-re-animation')) {
					item.classList.remove('animated');
				}
			}
		});
	}

	setTimeout(() => {
		animOnScroll();
	}, 150);
}
//====================================================


// growing numbers ====================================================
let numberElements = document.querySelectorAll('.designing-card__number span');
let numbers = [];
if (numberElements) {
	numberElements.forEach((el, i) => {
		el.classList.add('anim-item');
		numbers.push(el.innerHTML);
		el.innerHTML = 0;
	});

	window.addEventListener('scroll', growNumbers);

	function growNumbers() {
		numberElements.forEach((item, i) => {
			const itemHeight = item.offsetHeight;
			const itemOffset = offset(item).top;
			//коли видно чверть елемента
			const animStart = 4;

			let itemPoint = window.innerHeight - itemHeight / animStart;

			if (itemHeight > window.innerHeight) {
				itemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if ((scrollY > itemOffset - itemPoint) && scrollY < (itemOffset + itemHeight)) {
				if (item.classList.contains('anim-item')) {
					growNumber(numbers[i], item, 2000, 20);
					item.classList.remove('anim-item');
				}
			}
		});
	}

	function growNumber(num, elem, time, step) {
		if (Number.isFinite(parseInt(num))) { //перевірка, чи є num числом
			num = parseInt(num);
		} else {
			console.log('The element is not a number');
			return;
		}
		if (step > num) {
			console.log('The step cannot be more than a number');
			return;
		}
		let n = 0;
		//прибираємо в змінній num залишок від ділення на step
		//щоб число виводилось коректно
		let multipleOfStep = step * Math.floor(num / step);
		let numRemainder = num - multipleOfStep;
		let stepTime = Math.round(time / (num / step));
		let interval = setInterval(() => {
			n += step;
			if (n == num) {
				clearInterval(interval);
			} else if (n == multipleOfStep) {
				//додаємо раніше забраний залишок
				n += numRemainder;
				elem.innerHTML = n;
				clearInterval(interval);
			}
			elem.innerHTML = n;
		}, stepTime);
	}

	growNumbers();
}
//====================================================