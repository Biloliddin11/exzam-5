// Base URL for the API
const BASE_URL = 'https://dummyjson.com'

const detailWrapperEl = document.querySelector('.detail__wrapper')
const smallImagesWrapperEl = document.querySelector('.small__images')
const mainImageEl = document.querySelector('.images__wrapper > img')
const minusBtn = document.querySelector('.plus__minus__btn button:first-child')
const quantityBtn = document.querySelector(
	'.plus__minus__btn button:nth-child(2)'
)
const plusBtn = document.querySelector('.plus__minus__btn button:last-child')

const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get('id')

function fetchProductDetails(id) {
	fetch(`${BASE_URL}/products/${id}`)
		.then(response => {
			if (!response.ok) throw new Error('Failed to fetch product details')
			return response.json()
		})
		.then(product => {
			populateDetailPage(product)
		})
		.catch(error => {
			console.error('Error fetching product details:', error)
		})
}

function populateDetailPage(product) {
	mainImageEl.src = product.thumbnail

	smallImagesWrapperEl.innerHTML = ''
	product.images.slice(0, 4).forEach(image => {
		const smallImg = document.createElement('img')
		smallImg.src = image
		smallImg.alt = 'Product Image'
		smallImg.addEventListener('click', () => {
			mainImageEl.src = image
		})
		smallImagesWrapperEl.appendChild(smallImg)
	})

	const detailContentEl = document.querySelector('.detail__content')
	detailContentEl.querySelector('h5').textContent = product.title
	detailContentEl.querySelector('.reviews').innerHTML = createStars(
		product.rating
	)
	detailContentEl.querySelector(
		'span'
	).textContent = `(${product.stock} Reviews)`
	detailContentEl.querySelector('p').textContent =
		product.stock > 0 ? 'In stock' : 'Out of stock'
	detailContentEl.querySelector(
		'strong'
	).textContent = `$${product.price.toFixed(2)}`
	detailContentEl.querySelector('.info__text').textContent = product.description
}

let quantity = 1
minusBtn.addEventListener('click', () => {
	if (quantity > 1) {
		quantity--
		quantityBtn.textContent = quantity
	}
})
plusBtn.addEventListener('click', () => {
	quantity++
	quantityBtn.textContent = quantity
})

if (productId) {
	fetchProductDetails(productId)
} else {
	console.error('Product ID not found in URL.')
}
