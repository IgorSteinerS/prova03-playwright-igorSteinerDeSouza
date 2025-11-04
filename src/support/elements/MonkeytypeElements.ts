import { Locator, Page } from '@playwright/test';
import BaseElements from './BaseElements';

export default class MonkeytypeElements extends BaseElements {
  constructor(readonly page: Page) {
    super(page);
    this.page = page;
  }

  getCampoEmail(): Locator {
    return this.page.locator('input[name="current-email"]');
  }

  getCampoSenha(): Locator {
    return this.page.locator('input[name="current-password"]');
  }

  getBotaoSignIn(): Locator {
    return this.page.locator('button.signIn');
  }

  getUsuarioLogado(): Locator {
    return this.page.locator('a.view-account .text');
  }

  getBotaoAceitarCookies(): Locator {
    return this.page.getByRole('button', { name: 'Accept' });
  }
}