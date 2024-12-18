import { expect, test } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'
import { faker } from '@faker-js/faker'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

test('navigate to form page @smoke', async ({ page }) => {
  const pageManager = new PageManager(page)
  await pageManager.navigateTo().formLayoutsPage()
  await pageManager.navigateTo().datePickerPage()
  await pageManager.navigateTo().smartTablePage()
  await pageManager.navigateTo().toastrPage()
  await pageManager.navigateTo().tooltipPage()
})

test('parametrized method @smoke', async ({ page }) => {
  const pageManager = new PageManager(page)
  const randomFullName = faker.person.fullName()
  const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`

  await pageManager.navigateTo().formLayoutsPage()
  await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 2')
  // await page.screenshot({ path: 'screenshot/formsLayoutsPage.png' })
  // const buffer = await page.screenshot()
  // console.log(buffer.toString('base64'))

  await pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox(randomFullName, randomEmail, true)
  // await page.locator('nb-card', { hasText: "Inline form" }).screenshot({ path: 'screenshot/inlineForm.png' })

  // await pageManager.navigateTo().datePickerPage()
  // await pageManager.onDatepickerPage().selectCommonDatePickerDateFromToday(1)

  // await pageManager.onDatepickerPage().selectDatePickerWithRangeFromToday(15, 20)
})

test.only('testing with argos CI', async ({ page }) => {
  const pm = new PageManager(page)
  await pm.navigateTo().formLayoutsPage()
  await pm.navigateTo().datePickerPage()
})
