import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase {

  constructor(page: Page) {
    super(page)
  }

  async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
    const usingTheGridEmailInput = this.page.locator('nb-card', { hasText: "Using the Grid" })
    await usingTheGridEmailInput.getByRole('textbox', { name: "Email" }).fill(email)
    await usingTheGridEmailInput.getByRole('textbox', { name: "Password" }).fill(password)
    await usingTheGridEmailInput.getByRole('radio', { name: optionText }).check({ force: true })
    await usingTheGridEmailInput.getByRole('button').click()
  }

  /**
   * Method to submit inline form with name, email and checkbox checked
   * @param name
   * @param email
   * @param rememberMe
   */
  async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
    const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
    await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
    await inlineForm.getByRole('textbox', { name: "Email" }).fill(email)
    if (rememberMe)
      await inlineForm.getByRole('checkbox').check({ force: true })

    await inlineForm.getByRole('button').click()
  }
}
