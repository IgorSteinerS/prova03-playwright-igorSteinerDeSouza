import { Page, expect } from '@playwright/test';
import MonkeytypeElements from '../elements/MonkeytypeElements';
import BasePage from './BasePage';

export default class MonkeytypePage extends BasePage {
  readonly monkeytypeElements: MonkeytypeElements;

  constructor(readonly page: Page) {
    super(page);
    this.page = page;
    this.monkeytypeElements = new MonkeytypeElements(page);
  }

  /**
   * @param email
   * @param senha
   */
  async fazerLogin(email: string, senha: string): Promise<void> {
    try {
      await this.monkeytypeElements
        .getBotaoAceitarCookies()
        .click({ timeout: 5000 });
      console.log('Banner de cookies aceito.');

      await this.monkeytypeElements
        .getCampoEmail()
        .waitFor({ state: 'visible', timeout: 5000 });
    } catch (error) {
      console.log('Banner de cookies não apareceu ou já foi aceito.');
    }

    await this.monkeytypeElements.getCampoEmail().click();
    await this.monkeytypeElements.getCampoEmail().fill(email);

    await expect(this.monkeytypeElements.getCampoEmail()).toHaveValue(email);

    await this.monkeytypeElements.getCampoSenha().click();
    await this.monkeytypeElements.getCampoSenha().fill(senha);
    await expect(this.monkeytypeElements.getCampoSenha()).toHaveValue(senha);

    await this.monkeytypeElements.getBotaoSignIn().click();
  }

  async validarLogin(username: string): Promise<void> {
    await this.page.waitForURL('**/account', { timeout: 10000 });

    await expect(this.page).toHaveURL(/.*\/account/);

    await expect(this.monkeytypeElements.getUsuarioLogado()).toBeVisible();
    await expect(this.monkeytypeElements.getUsuarioLogado()).toHaveText(
      username
    );
  }
}
