import { BrowserContext, Page, expect } from "playwright/test";
import { getRowIndex } from "src/utilities/utilities";

export class Owners{

    public readonly goHomeButton = this.page.locator("[class*='btn btn-default'] button",{hasText:'Home'});
    public readonly addNewOwnerButton = this.page.locator("[class*='btn btn-default']",{hasText:'Add Owner'});
    public readonly editOwnerButton = this.page.locator("[class*='btn btn-default']",{hasText:'Edit Owner'});
    public readonly newOwnerContainer = this.page.locator('[class="form-horizontal ng-untouched ng-pristine ng-invalid"]');
    public readonly telephoneInput = this.page.locator("input[name='telephone']");

    public async addNewOwner(firstName:string, lastName:string,address:string, city:string,telefone:string){
        await this.addNewOwnerButton.click();
        await (this.newOwnerContainer).waitFor({state:'visible'});
        await this.page.locator("input[name='firstName']").fill(firstName);
        await this.page.locator("input[name='lastName']").fill(lastName);
        await this.page.locator("input[name='address']").fill(address);
        await this.page.locator("input[name='city']").fill(city);
        await this.page.locator("input[name='telephone']").fill(telefone);
        await this.addNewOwnerButton.click();
        await this.page.waitForTimeout(500);
    }

    public async searchOwner(ownerLastName:string){
        await this.page.locator("input[name='lastName']").fill(ownerLastName);
        await this.page.locator("[class*='btn btn-default']",{hasText:'Find Owner'}).click();
    }

    public async editOwner(actualValue:string, newValue:string){

        const ownerRow = await this.page.locator('[class="table table-striped"]').first();
        await ownerRow.first().click();
        
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Update'}).click();
        await this.page.waitForTimeout(500);
    }

    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}