import { test, expect } from '@playwright/test';
import { join } from 'path';
import { TheConfig } from 'sicolo';
import MonkeytypePage from '../support/pages/MonkeytypePage';
import { faker } from '@faker-js/faker';
import { ai } from '@zerostep/playwright';

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

  test('Fazer login com senha incorreta', async () => {
    if (!EMAIL_TESTE) {
      throw new Error(
        'A variável de ambiente EMAIL_TESTE não está configurada.'
      );
    }
    const SENHA_INVALIDA = faker.internet.password();

    await monkeytypePage.verifyTitle('Login | Monkeytype');
    await monkeytypePage.fazerLogin(EMAIL_TESTE, SENHA_INVALIDA);
    await monkeytypePage.validarLoginFalho();
  });

  test.skip('Teste com ZeroStep - preencher campos de registro', async ({
    page,
  }) => {
    const aiArgs = { page, test };

    try {
      await ai('Click the "Accept" button', aiArgs);
      console.log('Banner de cookies aceito pela IA.');
    } catch (e) {
      console.log('Banner de cookies não apareceu.');
    }
    
    await ai('Type "usuario_ai_teste" into the username field on the register form', aiArgs);
    await ai('Type "email_ai@teste.com" into the email field on the register form', aiArgs);
    await ai('Type "Senha@Forte123" into the password field on the register form', aiArgs);

    await expect(
      page.locator('.register.side input[placeholder="username"]')
    ).toHaveValue('usuario_ai_teste');
    await expect(
      page.locator('.register.side input[placeholder="email"]')
    ).toHaveValue('email_ai@teste.com');
  });
});