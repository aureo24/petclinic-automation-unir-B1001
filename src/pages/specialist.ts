import { BrowserContext, Page, expect } from "playwright/test";
import { getRowIndex } from "src/utilities/utilities";

export class Specialties{

    public readonly goHomeButton = this.page.locator("[class*='btn btn-default'] button",{hasText:'Home'});
    public readonly addNewSpecialtiesButton = this.page.locator("[class*='btn btn-default']",{hasText:'Add'});
    public readonly newSpecialityContainer = this.page.locator('[class="form-horizontal ng-untouched ng-pristine ng-valid"]');

    public async addNewSpeciality(specialistName:string){
        await this.addNewSpecialtiesButton.click();
        await (this.newSpecialityContainer).waitFor({state:'visible'});
        await this.page.locator("input[name='name']").fill(specialistName);
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Save'}).click();
        await this.page.waitForTimeout(500);
    }

    public async editSpeciality(actualValue:string, newValue:string){
        await this.page.locator('tbody').locator('tr').first().waitFor({state:'visible'})
        const rowIndex = await getRowIndex(this.page,actualValue,"input[name='spec_name']");
        await this.page.locator('tbody').locator('tr').nth(rowIndex).locator("[class*='btn btn-default']",{hasText:'Edit'}).click();
        await this.page.locator("input[name='name']").clear();
        await this.page.locator("input[name='name']").fill(newValue);
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Update'}).click();
        await this.page.waitForTimeout(500);
    }

    public async deleteSpeciality(actualValue:string){
        await this.page.locator('tbody').locator('tr').first().waitFor({state:'visible'})
        const rowIndex = await getRowIndex(this.page,actualValue,"input[name='spec_name']");
        await this.page.locator('tbody').locator('tr').nth(rowIndex).locator("[class*='btn btn-default']",{hasText:'Delete'}).click();
        await this.page.waitForTimeout(500);
    }

    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}