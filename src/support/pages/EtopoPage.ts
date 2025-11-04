import EtopoElements from "../elements/EtopoElements";
import BasePage from "./BasePage";
import { Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

export default class EtopoPage extends BasePage {
    readonly etopoElements: EtopoElements;

    constructor(readonly page: Page) {
        super(page);
        this.page = page;
        this.etopoElements = new EtopoElements(page);
    }
    
    async preencherCamposValidos(): Promise<void> {
        await this.etopoElements.getCampoNome().fill(faker.person.firstName());
        await this.etopoElements.getCampoEmail().fill(faker.internet.email());
        await this.etopoElements.getCampoMensagem().fill(faker.person.bio());
    }

    async enviarFormulario(): Promise<void> {
        await this.etopoElements.getBotaoEnviar().click();
    }

    async validarEnvio(): Promise<void> {
        await expect(this.etopoElements.getMensagemSucesso()).toBeVisible();
    }

    // async validarFormularioNaoEnviado(): Promise<void> {
    //     await expect(this.etopoElements.getMensagemSucesso()).not.toBeVisible();
    //     await expect(this.etopoElements.getCampoEmail()).toHaveAttribute('aria-invalid', 'true');
    // }

    // async validarCampoEmailInvalido(): Promise<void> {
    //     await expect(this.etopoElements.getCampoEmail()).toHaveAttribute('aria-invalid', 'true');
    // }

    async preencherEmailInvalido(emailInvalido: string = 'email-invalido'): Promise<void> {
        await this.etopoElements.getCampoEmail().fill(emailInvalido);
    }

    async validarFormularioNaoEnviado(): Promise<void> {
        await this.page.waitForTimeout(1000);
        await expect(this.etopoElements.getMensagemSucesso()).not.toBeVisible();
        await expect(this.etopoElements.getCampoEmail()).toBeVisible();
        await expect(this.etopoElements.getBotaoEnviar()).toBeVisible();
    }

    async validarCampoEmailInvalido(): Promise<void> {
        await this.page.waitForTimeout(1000);
        await expect(this.etopoElements.getMensagemSucesso()).not.toBeVisible();
        await expect(this.etopoElements.getCampoEmail()).toBeVisible();
    }
}