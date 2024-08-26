import { BrowserContext, Page } from "playwright/test";
import { Specialties } from "./specialist";
import { PetType } from "./pet-types";
import { Veterinarians } from "./vets";
import { Owners } from "./owners";

export class MenuNavigation{

    public async specialtiesPage() {
        await this.page.getByTitle('specialties').click();
        return new Specialties(this.page);
    }

    public async petTypePage() {
        await this.page.getByTitle('pettypes').click();
        return new PetType(this.page);
    }

    public async veterinariansPage() {
        await this.page.locator('[class*="dropdown-toggle"]').filter({hasText:' Veterinarians'}).click();
        await this.page.locator('[class*="glyphicon glyphicon-search"]').nth(1).waitFor({state:'visible'})
        await this.page.locator('[class*="glyphicon glyphicon-search"]').nth(1).click();
        return new Veterinarians(this.page);
    }

    public async ownersPage() {
        await this.page.locator('[class*="dropdown-toggle"]').filter({hasText:' Owners'}).click();
        await this.page.locator('[class*="glyphicon glyphicon-search"]').first().waitFor({state:'visible'})
        await this.page.locator('[class*="glyphicon glyphicon-search"]').first().click();
        return new Owners(this.page);
    }

    
    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}