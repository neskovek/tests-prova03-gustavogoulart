import { Locator, Page } from "playwright";
import BaseElements from "./BaseElements";

export default class EtopoElements extends BaseElements {
    constructor(readonly page: Page) {
        super(page);
        this.page = page;
    }

    getCampoNome(): Locator {
        return this.page.locator('#form-field-name');
    }

    getCampoEmail(): Locator {
        return this.page.locator('#form-field-email');
    }

    getCampoMensagem(): Locator {
        return this.page.locator('#form-field-message');
    }

    getBotaoEnviar(): Locator {
        return this.page.locator('button[type="submit"]:has-text("Enviar")');
    }

    getMensagemSucesso(): Locator {
        return this.page.locator('.elementor-message-success');
    }
}