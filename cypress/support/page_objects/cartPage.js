export class CartPage {

    closeCart() {
        cy.get('button[aria-label="Закрити модальне вікно"]').click()
    }

    verifyProductTitles(product1, product2) {
        cy.wait(2000)
        cy.get('a[href="https://rozetka.com.ua/ua/apple-iphone-15-pro-max-256gb-natural-titanium/p395461104/"][class="product-link cart-product__title"]').should('have.text', product1)
        cy.get('a[href="https://rozetka.com.ua/ua/apple_macbook_air_13_m1_256gb_2020_space_gray/p245161909/"][class="product-link cart-product__title"]').should('have.text', product2)
    }

    verifyProductPrices(product1Price, product2Price) {
        cy.get('li.cart-list__item.ng-star-inserted div.cart-product__coast.ng-star-inserted p[data-testid="cost"]').then(prods => {
            for (let i = 0; i < prods.length; i++) {
                const textPrice = prods[i].textContent
                const price = Number(textPrice.replaceAll(/[^\d]/g, ''))
            }
            const price1 = Number(prods[0].textContent.replaceAll(/[^\d]/g, ''))
            const price2 = Number(prods[1].textContent.replaceAll(/[^\d]/g, ''))
            expect(price1).to.equal(product1Price)
            expect(price2).to.equal(product2Price)
        })  
    }

    verifyTotalPrice(product1Price, product2Price) {
        cy.get('div.cart-receipt__sum-price').invoke('text').then(price => {
            let sum = Number(price.replaceAll(/[^\d]/g, ''))
            let totalPrice = product1Price + product2Price
            expect(sum).to.equal(totalPrice)
          })
    }
}

export const cartPage = new CartPage()