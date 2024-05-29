export class MainPage {

    openRozetka(baseUrl) {
        cy.visit(baseUrl)
        cy.viewport(1920, 1080)
    }

    verifyUrl(homeUrl) {
        cy.url().should("eq", homeUrl)
    }

    selectCategoryLaptopsAndComputers(category) {
        cy.get('li.menu-categories__item.ng-star-inserted').contains(category).click()
    }

    selectCategoryLaptops(category) {
        cy.get('.tile-cats').contains(category).click()
    }

    selectCategorySmartphonesAndElectronics(category) {
        cy.get('li.menu-categories__item').contains(category).click()
    }

    selectCategoryMobilePhones(category) {
        cy.wait(1000)
        cy.get('.tile-cats').contains(category).click()
    }

    applyFilterBrand(brand) {
        cy.get(`a[href="/ua/notebooks/c80004/producer=${brand}/"]`).click()
    }

    applyFilterMaxPrice(maxPrice) {
        cy.get('input[formcontrolname="max"]').clear()
        cy.wait(2000)
        cy.get('input[formcontrolname="max"]').type(maxPrice)
        cy.get('button[type="submit"]').click()  
    }

    applyFilterMobileBrand() {
        cy.get('a[href="/ua/mobile-phones/c80003/producer=apple/"]').click()
    }

    applyFilterMobilePhoneSeries() {
        cy.get('a[data-id="iPhone 15 Pro Max"]').click()
    }

    sortItemsByPriceFromAndTo() {
        cy.get('div.catalog-settings select').select('Від дешевих до дорогих')
    }

    verifySortingItemsByPriceFromAndTo() {
        cy.get('.catalog-grid span.goods-tile__price-value').not('.goods-tile_state_disabled').then(prods => {
            let prevPrice = 0;
            for (let i = 0; i < prods.length; i++) {
                const textPrice = prods[i].textContent
                const price = Number(textPrice.replaceAll(/[^\d]/g, ''))
                if (price < prevPrice) {
                    throw new Error("test fails here")
                }
                prevPrice = price
            }
        })  
    }

    applyFilterAppleSeries() {
        cy.get('a[href="/ua/notebooks/c80004/producer=apple;series=208125/"]').click()
    }

    selectProduct(product) {
        cy.get(product).click()
    }

    addProductToCart() {
        cy.wait(1000)
        cy.get('.mode-slim > .buy-button').click({force: true})
        cy.wait(1000)
    }

    openMainCatalog() {
        cy.get('#fat-menu').click()
    }

    fillSearchInput(searchProduct) {
        cy.get('input[name="search"]').type(searchProduct)
        cy.get('.search-form > .button').click()
    }

    verifySortingSearchProduct(searchProduct) {
        cy.get('span.goods-tile__title').then(productTitles => {
            for (let i = 0; i < productTitles.length; i++) {
                expect(productTitles[i].textContent).to.contain(searchProduct);
            }
        })
    }  
}

export const mainPage = new MainPage()