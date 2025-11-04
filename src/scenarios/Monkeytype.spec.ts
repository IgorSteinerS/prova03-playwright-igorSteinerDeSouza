import { test } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import MonkeytypePage from '../support/pages/MonkeytypePage';

const EMAIL_TESTE = process.env.EMAIL_TESTE;
const SENHA_TESTE = process.env.SENHA_TESTE;
const USERNAME_ESPERADO = 'Shogoguis';

test.describe('Monkeytype Login', () => {
  const CONFIG = join(__dirname, '../support/fixtures/config.yml');
  let monkeytypePage: MonkeytypePage;
  const BASE_URL = TheConfig.fromFile(CONFIG)
    .andPath('application.monkey_type')
    .retrieveData();

  test.beforeEach(async ({ page }) => {
    monkeytypePage = new MonkeytypePage(page);
    await page.goto(BASE_URL);
  });

  test('Fazer login com sucesso', async () => {
    if (!EMAIL_TESTE || !SENHA_TESTE) {
      throw new Error(
        'As variáveis de ambiente EMAIL_TESTE e SENHA_TESTE não estão configuradas.'
      );
    }

    await monkeytypePage.verifyTitle('Login | Monkeytype');

    await monkeytypePage.fazerLogin(EMAIL_TESTE, SENHA_TESTE);

    await monkeytypePage.validarLogin(USERNAME_ESPERADO);
  });
});
