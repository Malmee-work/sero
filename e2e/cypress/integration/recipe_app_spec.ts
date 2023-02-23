describe("Recipe tests", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it(`Given I have a new recipe
      When I add the new recipe name
      And ingredients
      And measurements
      And cooking method
      Then the new recipe is saved for later`, () => {
    cy.get(".add-recipe").click();

    cy.get('[data-test-id="new-recipe-name"]').type(
      "chocolate biscuit pudding"
    );

    cy.get('[data-test-id="add-ingredient-name-0"]').type("marie biscuits");
    cy.get('[data-test-id="add-ingredient-amount-0"]').type("2");
    cy.get('[data-test-id="add-ingredient-measurement-0"]').select("units");
    cy.get('[data-test-id="add-ingredient"]').click();
    cy.get('[data-test-id="add-ingredient-name-1"]').type("fresh milk");
    cy.get('[data-test-id="add-ingredient-amount-1"]').type("3");
    cy.get('[data-test-id="add-ingredient-measurement-1"]').select("cups");

    cy.get('[data-test-id="add-method-0"]').type(
      "boil milk to a temperature of 100 degrees celcius"
    );
    cy.get('[data-test-id="add-method"]').click();
    cy.get('[data-test-id="add-method-1"]').type("soak marie biscuits in milk");

    cy.get('[data-test-id="add-recipe"]').click();
    cy.get('[data-test-id="add-recipe-alert"]').contains(
      "Recipe added successfully"
    );

    cy.get('[data-test-id="back-from-add-recipe"]').click();
    cy.get('[data-test-id="search-recipe"]').type("pudding");
    cy.get('[data-test-id="search-result-0"]').contains(
      "chocolate biscuit pudding"
    );
  });

  it(`Given I want to look for a recipe
      When I search by the name of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    cy.get(".add-recipe").click();

    cy.get('[data-test-id="new-recipe-name"]').type(
      "egg and tomato sandwitches"
    );

    cy.get('[data-test-id="add-ingredient-name-0"]').type("bread");
    cy.get('[data-test-id="add-ingredient-amount-0"]').type("1");
    cy.get('[data-test-id="add-ingredient-measurement-0"]').select("units");
    cy.get('[data-test-id="add-ingredient"]').click();
    cy.get('[data-test-id="add-ingredient-name-1"]').type("eggs");
    cy.get('[data-test-id="add-ingredient-amount-1"]').type("3");
    cy.get('[data-test-id="add-ingredient-measurement-1"]').select("units");

    cy.get('[data-test-id="add-method-0"]').type("boil eggs");

    cy.get('[data-test-id="add-recipe"]').click();

    cy.get('[data-test-id="back-from-add-recipe"]').click();
    cy.get('[data-test-id="search-recipe"]').type("sandwitches");
    cy.get('[data-test-id="search-result-0"]')
      .contains("egg and tomato sandwitches")
      .click();

    cy.get('[data-test-id="view-recipe-name"]').contains(
      "Recipe: egg and tomato sandwitches"
    );
    cy.get('[data-test-id="view-recipe-ingredient-name-0"]').contains("bread");
    cy.get('[data-test-id="view-recipe-ingredient-name-1"]').contains("eggs");
    cy.get('[data-test-id="view-recipe-method-name-0"]').contains("boil eggs");
  });

  it(`Given I want to look for a recipe by ingredients
      When I search by the ingredient of the recipe
      Then I find the recipe
      And I can see the ingredients
      And I can see the cooking methods`, () => {
    cy.get(".add-recipe").click();

    cy.get('[data-test-id="new-recipe-name"]').type("fish and chips");

    cy.get('[data-test-id="add-ingredient-name-0"]').type("moda fish");
    cy.get('[data-test-id="add-ingredient-amount-0"]').type("1");
    cy.get('[data-test-id="add-ingredient-measurement-0"]').select("units");
    cy.get('[data-test-id="add-ingredient"]').click();
    cy.get('[data-test-id="add-ingredient-name-1"]').type("flour");
    cy.get('[data-test-id="add-ingredient-amount-1"]').type("4");
    cy.get('[data-test-id="add-ingredient-measurement-1"]').select("cups");

    cy.get('[data-test-id="add-method-0"]').type("fry the fish");

    cy.get('[data-test-id="add-recipe"]').click();

    cy.get('[data-test-id="back-from-add-recipe"]').click();
    cy.get('[data-test-id="search-recipe"]').type("moda");
    cy.get('[data-test-id="search-result-0"]')
      .contains("fish and chips")
      .click();

    cy.get('[data-test-id="view-recipe-name"]').contains(
      "Recipe: fish and chips"
    );
    cy.get('[data-test-id="view-recipe-ingredient-name-0"]').contains(
      "moda fish"
    );
    cy.get('[data-test-id="view-recipe-ingredient-name-1"]').contains("flour");
    cy.get('[data-test-id="view-recipe-method-name-0"]').contains(
      "fry the fish"
    );
  });
});
