import { Page, expect } from "playwright/test";

export async function validateTextOnRow(page: Page, text: string, innerLocator: string): Promise<boolean> {
    for (const row of await page.locator('tbody').locator('tr').all()) {
        if(await row.locator(innerLocator).inputValue() == text){
            return true;
        }

    }
    return false;
}

export async function getRowIndex(page: Page, text: string, innerLocator: string): Promise<number> {
    let index = 0;
    for (const row of await page.locator('tbody').locator('tr').all()) {
        if(await row.locator(innerLocator).inputValue() == text){
            return index;
        }
        index++;
    }
}

export async function validateTextOnRowTableStriped(page: Page, text: string, innerLocator: string): Promise<boolean> {
    for (const row of await page.locator('tbody').locator('tr').all()) {
        if(await row.locator(innerLocator).first().innerText() == text){
            return true;
        }

    }
    return false;
}

export async function getRowIndexTableStriped(page: Page, text: string, innerLocator: string): Promise<number> {
    let index = 0;
    for (const row of await page.locator('tbody').locator('tr').all()) {
        if(await row.locator(innerLocator).first().innerText() == text){
            return index;
        }
        index++;
    }
}