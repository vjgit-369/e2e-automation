Feature: E-commerce End-to-End Shopping Journey
  As a customer
  I want to search for products and complete a purchase
  So that I can buy items from the online store

  Scenario: Complete shopping journey from product search to order completion
    Given I am on the automation exercise login page
    When I navigate to the Products page
    And I search for "Pure Cotton Neon Green Tshirt"
    Then I should see the search results

    When I select the product from search results
    And I add the product to cart
    Then the product should be added to cart successfully

    When I proceed to cart
    Then I should see correct product details in cart
    And the cart total should be calculated correctly

    When I proceed to checkout
    And I fill in shipping information
    And I select payment method
    And I review the order summary
    And I place the order
    Then I should see the order confirmation
    And the order details should be correct
    And the order should appear in my order history