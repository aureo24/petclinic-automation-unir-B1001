import { BrowserContext, Page, expect } from "playwright/test";
import { getRowIndex, getRowIndexTableStriped } from "src/utilities/utilities";

export class Veterinarians{

    public readonly goHomeButton = this.page.locator("[class*='btn btn-default'] button",{hasText:'Home'});
    public readonly addNewVeterinariansButton = this.page.locator("[class*='btn btn-default']",{hasText:'Add'});
    public readonly newVeterinariansContainer = this.page.locator('[class="form-horizontal ng-untouched ng-pristine ng-invalid"]');

    public async addNewVeterinarians(firstName:string, lastName:string,type:string){
        await this.addNewVeterinariansButton.click();
        await (this.newVeterinariansContainer).waitFor({state:'visible'});
        await this.page.locator("input[name='firstName']").fill(firstName);
        await this.page.locator("input[name='lastName']").fill(lastName);
        await this.page.locator('#specialties').selectOption(`${type}`);
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Save Vet'}).click();
        await this.page.waitForTimeout(500);
    }

    public async editVeterinarians(actualValue:string, newValue:string){
        await this.page.locator('tbody').locator('tr').first().waitFor({state:'visible'})
        const rowIndex = await getRowIndexTableStriped(this.page,actualValue,"td");
        await this.page.locator('tbody').locator('tr').nth(rowIndex).locator("[class*='btn btn-default']",{hasText:'Edit Vet'}).click();
        await this.page.locator("input[name='firstName']").clear();
        await this.page.locator("input[name='firstName']").fill(newValue);
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Save Vet'}).click();
        await this.page.waitForTimeout(500);
    }

    public async addSpecialties(vetSelected:string, specialists:string[]){
        await this.page.locator('tbody').locator('tr').first().waitFor({state:'visible'})
        const rowIndex = await getRowIndexTableStriped(this.page,vetSelected,"td");
        await this.page.locator('tbody').locator('tr').nth(rowIndex).locator("[class*='btn btn-default']",{hasText:'Edit Vet'}).click();
        await  this.page.locator('#spec').click();
        for(const specialist in specialists ){
            await this.page.getByText(specialist).click();
        };
        await this.page.locator("#spec").click({force:true});
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Save Vet'}).click();
        await this.page.waitForTimeout(500);
    }

    public async deleteVeterinarians(actualValue:string){
        await this.page.locator('tbody').locator('tr').first().waitFor({state:'visible'})
        const rowIndex = await getRowIndexTableStriped(this.page,actualValue,"td");
        await this.page.locator('tbody').locator('tr').nth(rowIndex).locator("[class*='btn btn-default']",{hasText:'Delete Vet'}).click();
        await this.page.waitForTimeout(500);
    }

    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}