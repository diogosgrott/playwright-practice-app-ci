import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.getByText('Forms').click()
  await page.getByText('Form Layouts').click()
})

test.skip('Locator syntax rule', async ({ page }) => {
  //by tag name
  page.locator('input')

  //by ID
  await page.locator('#inputEmail1').click()

  //by class value
  page.locator('.shape=rectangle')

  //by attribute
  page.locator('[placeholder="Email"]')

  //by entire class value
  page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

  //combine different selectors
  page.locator('input[placeholder="Email"].shape=rectangle')

  //by XPath (NOT recommendable)
  page.locator('//*[@id="inputEmail1"]')

  //by partial text match
  page.locator(':text("Using")')

  //by exact text match
  page.locator(':text-is("Using the Grid")')
})

test.skip('User facing locator', async ({ page }) => {
  await page.getByRole('textbox', { name: "Email" }).first().click()
  await page.getByRole('button', { name: "Sign in" }).first().click()

  await page.getByLabel('Email').first().click()

  await page.getByPlaceholder('Jane Doe').first().click()

  await page.getByText('Using the Grid').click()

  await page.getByTestId('SignIn').click()

  //await page.getByTitle('IoT Dashboard').click()
})

test.skip('locating child elements', async ({ page }) => {
  await page.locator('nb-card nb-radio :text-is("Option 1")').click()
  await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

  await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click()

  await page.locator('nb-card').nth(3).getByRole('button').click()
})

test.skip('locating parent elements', async ({ page }) => {
  await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).first().click()
  await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: "Email" }).first().click()

  await page.locator('nb-card').filter({ hasText: "Basic form" }).getByRole('textbox', { name: "Email" }).first().click()
  await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).first().click()

  await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Email" }).first().click()

  // not recommended
  await page.locator(':text-is("Using the Grid")').locator('..').getByRole('textbox', { name: "Email" }).first().click()
})

test.skip('Reusing the locators', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const emailField = basicForm.getByRole('textbox', { name: "Email" })
  await emailField.fill('test@test.com')
  await basicForm.getByRole('textbox', { name: "Password" }).fill('Welcome123')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  await expect(emailField).toHaveValue('test@test.com')
})

test.skip('Extracting values', async ({ page }) => {
  //single test value
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const buttonText = await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')

  //all text values
  const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
  expect(allRadioButtonLabels).toContain("Option 1")

  //input value
  const emailField = basicForm.getByRole('textbox', { name: "Email" })
  await emailField.fill('test@test.com')
  const emailValue = await emailField.inputValue()
  expect(emailValue).toEqual("test@test.com")

  const placeHolderValue = await emailField.getAttribute('placeholder')
  expect(placeHolderValue).toEqual("Email")
})

test('Assertions', async ({ page }) => {
  const basicForm = page.locator('nb-card').filter({ hasText: "Basic form" })
  const basicFormButton = basicForm.locator('button')
  //General assertions
  const value = 5
  expect(value).toEqual(5)

  const text = await basicFormButton.textContent()
  expect(text).toEqual("Submit")

  //Locator assertion
  await expect(basicFormButton).toHaveText('Submit')

  //Soft Assertion
  await expect.soft(basicFormButton).toHaveText('Submit')
  await basicFormButton.click()
})
// test
// .describe
// ('test suite 1', () => {
//   test('the first test', () => {

//   })
// })
