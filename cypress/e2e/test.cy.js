/// <reference types="Cypress" />
import { mainPage } from "../support/page_objects/mainPage.js"
import { cartPage } from "../support/page_objects/cartPage.js"


describe('Rozetka', () => {

    let testData;
    before(() => {
        cy.fixture('config.json').then((jsonData) => {
          testData = jsonData
        })
    })

    beforeEach('Open application', () => {
        mainPage.openRozetka(testData.baseUrl)
        mainPage.verifyUrl(testData.homeUrl)    
    }) 
  
    it.only('Verify the price filter working', () => {
        mainPage.selectCategoryLaptopsAndComputers(testData.categoryLaptopsAndComputers)
        mainPage.selectCategoryLaptops(testData.categoryLaptops)
        mainPage.applyFilterBrand(testData.brand)
        mainPage.applyFilterMaxPrice(testData.maxPrice)
        mainPage.sortItemsByPriceFromAndTo()
        mainPage.verifySortingItemsByPriceFromAndTo()
    })

    it('Add items to the basket', () => {
        mainPage.selectCategoryLaptopsAndComputers(testData.categoryLaptopsAndComputers)
        mainPage.selectCategoryLaptops(testData.categoryLaptops)
        mainPage.applyFilterBrand(testData.brand)
        mainPage.applyFilterAppleSeries()
        mainPage.selectProduct(testData.product1)
        mainPage.addProductToCart()
        cartPage.closeCart()
        mainPage.openMainCatalog()
        mainPage.selectCategorySmartphonesAndElectronics(testData.categorySmartphonesAndElectronics)
        mainPage.selectCategoryMobilePhones(testData.categoryMobilePhones)
        mainPage.applyFilterMobileBrand()
        mainPage.applyFilterMobilePhoneSeries()
        mainPage.selectProduct(testData.product2)
        mainPage.addProductToCart()
        cartPage.verifyProductTitles(testData.product1Title, testData.product2Title)
        cartPage.verifyProductPrices(testData.product1Price, testData.product2Price)
        cartPage.verifyTotalPrice(testData.product1Price, testData.product2Price)     
    })

    it('Search random item by name.', () => {
        mainPage.fillSearchInput(testData.searchProduct)
        mainPage.verifySortingSearchProduct(testData.searchProduct)
    })

    it('Negative test. Search random item by name.', () => {
        mainPage.fillSearchInput(testData.searchProduct)
        mainPage.verifySortingSearchProduct(testData.searchProductByIncorrectName)
    })

})
