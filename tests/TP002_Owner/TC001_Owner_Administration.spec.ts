import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json";
import { MenuNavigation } from '@/pages/navigation';

test.describe.serial('TC001 - Owner Administration', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add and search Owner', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.addNewOwner(
            CONSTANTS.NEW_OWNER.FIRST_NAME,
            CONSTANTS.NEW_OWNER.LAST_NAME,
            CONSTANTS.NEW_OWNER.ADDRESS,
            CONSTANTS.NEW_OWNER.CITY,
            CONSTANTS.NEW_OWNER.NUMBER
        );
        await ownersPage.searchOwner(CONSTANTS.NEW_OWNER.LAST_NAME);
        const ownerTable = await page.locator('.ownerFullName',{hasText:CONSTANTS.NEW_VISIT.OWNER.LAST_NAME}).all()
        await expect(ownerTable).toHaveLength(1)
    });
    
    test('SC002 - User is not able to edit telephone that has alphabetic characters', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.searchOwner(CONSTANTS.NEW_OWNER.LAST_NAME);
        await page.getByText(CONSTANTS.NEW_OWNER.FULL_NAME).click();
        await ownersPage.editOwnerButton.click();
        //Validar que solo acepte numeros
         await page.locator("input[name='telephone']").fill(CONSTANTS.NEW_OWNER.WRONG_NUMBER);
         await page.locator("span[class*='help-block']").waitFor();
         await expect(page.locator("span[class*='help-block']")).toContainText(CONSTANTS.ERROR_MESSAGES.ONLY_NUMBERIC_CHAR_NEW_OWNER);
    });
});


//TP (modulo) - TC (casos de funcionalidad) - SC 