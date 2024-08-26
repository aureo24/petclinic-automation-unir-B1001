import { BrowserContext, Page, expect } from "playwright/test";
import { getRowIndex } from "src/utilities/utilities";

export class Pets{

    public readonly addNewPetButton = this.page.locator("[class*='btn btn-default']",{hasText:'Add New Pet'});
    public readonly editPetButton = this.page.locator("[class*='btn btn-default']",{hasText:'Edit Pet'});
    public readonly deletePetButton = this.page.locator("[class*='btn btn-default']",{hasText:'Delete Pet'});
    public readonly newPetContainer = this.page.locator('[class="form-horizontal ng-untouched ng-pristine ng-invalid"]');

    public async addNewPet(petName:string, birthDate:string,type:string){
        await this.addNewPetButton.click();
        await (this.newPetContainer).waitFor({state:'visible'});
        await this.page.locator("#name").fill(petName);
        await this.page.locator("input[name='birthDate']").fill(birthDate);
        await this.page.locator("#type").selectOption(type);
        await this.page.locator("[class*='btn btn-default']",{hasText:'Save Pet'}).click();
        await this.page.waitForTimeout(500);
    }

    public async confirmPetAdded(text:string){
        await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").first().waitFor({state:'visible'})
       for(const row of await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").all()) {
            if(await row.locator('dd').first().innerText() == text){
                return true;
            }
       }
       return false;
    }

    public async getPetIndexRow(text:string){
        let index = 0;
        const table = this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").all();
        for(const row of await table){
                 if(await row.locator('dd').first().innerText() == text){
                 return index;
             }
             index++;
        }
     }

    public async editPet(actualValue:string, newValue:string){
        await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").first().waitFor({state:'visible'});
        const rowIndex = await this.getPetIndexRow(actualValue);
        const petRow = await this.page.locator('[class="table table-striped"]').locator(".dl-horizontal").nth(rowIndex);
        await petRow.locator(this.editPetButton).click();
        await this.page.locator("#name").clear();
        await this.page.locator("#name").fill(newValue); 
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Update Pet'}).click();
        await this.page.waitForTimeout(500);
    }

    public async deletePet(petName:string){
        await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").first().waitFor({state:'visible'});
        const rowIndex = await this.getPetIndexRow(petName);
        const petRow = await this.page.locator('[class="table table-striped"]').locator(".dl-horizontal").nth(rowIndex);
        await petRow.locator(this.deletePetButton).click();
        await this.page.waitForTimeout(500);
    }

    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}