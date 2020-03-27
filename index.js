const { writeFile } = require('fs').promises

const productData = [
    {
      productId: 1000,
      productName: 'Product 1000'
    },
    {
      productId: 1001,
      productName: 'Product 1001'
    }
]

const stockData = [
    {
        productId: 1000,
        locationId: 1,
        stock: 21
    },
    {
        productId: 1000,
        locationId: 2,
        stock: 8
    },
    {
        productId: 1001,
        locationId: 1,
        stock: 4
    },
    {
        productId: 1001,
        locationId: 2,
        stock: 10
    }
]

const locationData = [
    {
        locationId: 1,
        locationName: 'Location 1'
    },
    {
        locationId: 2,
        locationName: 'Location 2'
    }
]

// deklarasi custom higher-order function
function find(array, callback) {
    const length = array.length;
    for (let i = 0; i < length; i++) {
        if (callback(array[i], i)) {
            return array[i]
        }
    }
    
    return null
}

const mappedFilter = array => 
    keyToAccumulate =>
    (fnFilter = () => true) =>
    (fnMap = data => data) => {
        let total = 0
        const
            detail = [],
            length = array.length
        
        for (let i = 0; i < length; i++) {
            if (fnFilter(array[i], i)) {
                detail.push(fnMap(array[i], i))
                keyToAccumulate && (
                    total += array[i][keyToAccumulate]
                )
            }
        }

        return { total, detail }
    }

// end custom higher-order function

// SOLUSI
const mapProducts = (products = [], stocks = [], locations = []) => {
    const { detail: result } = mappedFilter(products)('stock')()(
        product => {
            const productStock = mappedFilter(stocks)
                ('stock')
                (stock => stock.productId === product.productId)
                (stock => {
                    const { locationName } = find(locations, loc => loc.locationId === stock.locationId)
                    return { locationName, stock: stock.stock }
                })

            return {
                productName: product.productName,
                stock: productStock
            }
        }
    )

    return result
}

// hanya untuk demo data
function demoData(totalProduct = 100, totalStock = 1000, totalLocation = 50) {
    const randomNumber = (min, max) => Math.floor((Math.random() * max) + min)

    const productData = []
    for (let i = 0; i < totalProduct; i++) {
        productData.push({
            productId: i + 1,
            productName: `Product ${i + 1}`
        })
    }

    const locationData = []
    for (let i = 0; i < totalStock; i++) {
        locationData.push({
            locationId: i + 1,
            locationName: `Location ${i + 1}`
        })
    }

    const stockData = []
    for (let i = 0; i < totalLocation; i++) {
        stockData.push({
            productId: randomNumber(1, totalProduct),
            locationId: randomNumber(1, totalLocation),
            stock: randomNumber(1, 200)
        })
    }

    return { productData, locationData, stockData }
}

// HASIL
// dengan jumlah data yang massive
const demo = demoData(10000, 15000, 500)
console.time('Execute time (10000 product, 15000 stock detail, 1000 location):')
const demoResult = mapProducts(demo.productData, demo.stockData, demo.locationData)
writeFile('./data-massive.json', JSON.stringify(demoResult, null, 2))
console.timeEnd('Execute time (10000 product, 15000 stock detail, 1000 location):')

// dengan data sesuai soal
console.time('Execute time (2 product, 4 stock detail, 2 location):')
const result = mapProducts(productData, stockData, locationData)
writeFile('./data-soal.json', JSON.stringify(result, null, 2))
console.timeEnd('Execute time (2 product, 4 stock detail, 2 location):')