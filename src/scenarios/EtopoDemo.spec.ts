import { test } from "@playwright/test";
import EtopoPage from "../support/pages/EtopoPage";
import { TheConfig } from "sicolo";
import { join } from "path";

test.describe('Testes funcionais no site da Etopocart', () => {
    const CONFIG = join(__dirname, '../support/fixtures/config.yml');
    let etopoPage: EtopoPage;
    const BASE_URL = TheConfig.fromFile(CONFIG)
        .andPath('application.etopo_url')
        .retrieveData();

    test.beforeEach(async ({ page }) => {
        etopoPage = new EtopoPage(page);
        await page.goto(BASE_URL);
    });

    test('Deve enviar formulário com dados válidos', async () => {
        await etopoPage.preencherCamposValidos();
        await etopoPage.enviarFormulario();
        await etopoPage.validarEnvio();
    });

    test('Não deve enviar formulário vazio - email obrigatório', async () => {
        await etopoPage.enviarFormulario();
        await etopoPage.validarFormularioNaoEnviado();
    });

    test('Não deve enviar com email inválido', async () => {
        await etopoPage.preencherEmailInvalido('email-sem-arroba');
        await etopoPage.enviarFormulario();
        await etopoPage.validarCampoEmailInvalido();
    });

    test('Deve enviar com apenas email preenchido', async () => {
        await etopoPage.etopoElements.getCampoEmail().fill('teste@email.com');
        await etopoPage.enviarFormulario();
        await etopoPage.validarEnvio();
    });
});