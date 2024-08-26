import { BrowserContext, Page, expect } from "playwright/test";
import { getRowIndex } from "src/utilities/utilities";

export class Visits{

    public readonly addNewVisitButton = this.page.locator("[class*='btn btn-default']",{hasText:'Add Visit'});
    public readonly editVisitButton = this.page.locator("[class*='btn btn-default']",{hasText:'Edit Visit'});
    public readonly deleteVisitButton = this.page.locator("[class*='btn btn-default']",{hasText:'Delete Visit'});
    public readonly newVisitContainer = this.page.locator('[class="form-horizontal ng-untouched ng-pristine ng-invalid"]');

    public async addNewVisit(petName:string, birthDate:string,description:string){
        await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").first().waitFor();
        const rowIndex = await this.getVisitIndexRow(petName);
        const VisitRow = await this.page.locator('[class="table table-striped"]').locator(".dl-horizontal").nth(rowIndex);
        await VisitRow.locator(this.addNewVisitButton).click();
        await (this.newVisitContainer).waitFor({state:'visible'});
        await this.page.locator("input[name='date']").fill(birthDate);
        await this.page.locator("#description").fill(description);
        await this.page.locator("[class*='btn btn-default']",{hasText:'Add Visit'}).click();
        await this.page.waitForTimeout(500);
    }

    public async confirmVisitAdded(text:string){
       await this.page.locator('[class*="table table-condensed"]').locator(".ng-star-inserted").first().waitFor({state:'visible'})
       for(const row of await this.page.locator('[class*="table table-striped"]').locator(".ng-star-inserted").all()) {
            if(await row.locator('dd').first().innerText() == text){
                return true;
            }
       }
       return false;
    }

    public async getVisitIndexRow(text:string){
        let index = 0;
        const table = this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").all();
        for(const row of await table){
                 if(await row.locator('dd').first().innerText() == text){
                 return index;
             }
             index++;
        }
     }

    public async editVisit(actualValue:string, newValue:string){
        await this.page.locator('[class*="table table-striped"]').locator(".dl-horizontal").first().waitFor({state:'visible'});
        const rowIndex = await this.getVisitIndexRow(actualValue);
        const VisitRow = await this.page.locator('[class="table table-striped"]').locator(".dl-horizontal").nth(rowIndex);
        await VisitRow.locator(this.editVisitButton).click();
        await this.page.locator("#name").clear();
        await this.page.locator("#name").fill(newValue); 
        await this.page.locator('button[class*="btn btn-default"]',{hasText:'Update Pet'}).click();
        await this.page.waitForTimeout(500);
    }

    constructor(private readonly page:Page, private readonly context?:BrowserContext) {
        this.page = page;
        this.context = context;
    }
}