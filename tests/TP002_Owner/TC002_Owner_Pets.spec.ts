import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json"
import { MenuNavigation } from '@/pages/navigation';
import { Pets } from '@/pages/pets';

test.describe.serial('TC002 - Owner Pets', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add pets to Owners', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.searchOwner(CONSTANTS.NEW_OWNER.LAST_NAME);
        await page.getByText(CONSTANTS.NEW_OWNER.FULL_NAME).click();
        const petPage = new Pets(page)
        await petPage.addNewPet(
            CONSTANTS.NEW_PET.NAME,
            CONSTANTS.NEW_PET.BIRTH_DATE,
            CONSTANTS.NEW_PET.TYPE,
        );
        await expect(await petPage.confirmPetAdded(CONSTANTS.NEW_PET.NAME)).toBe(true);
    });
    
    test('SC002 - User is able to edit pets information', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.searchOwner(CONSTANTS.NEW_OWNER.LAST_NAME);
        await page.getByText(CONSTANTS.NEW_OWNER.FULL_NAME).click();
        const petPage = new Pets(page);
        await petPage.editPet( CONSTANTS.NEW_PET.NAME, CONSTANTS.EDITED_PET.NAME);
        await expect(await petPage.confirmPetAdded(CONSTANTS.EDITED_PET.NAME)).toBe(true);
    });

    test('SC003 - User is able to delete pet', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.searchOwner(CONSTANTS.NEW_OWNER.LAST_NAME);
        await page.getByText(CONSTANTS.NEW_OWNER.FULL_NAME).click();
        const petPage = new Pets(page)
        await petPage.addNewPet(
            CONSTANTS.DELETED_PET.NAME,
            CONSTANTS.DELETED_PET.BIRTH_DATE,
            CONSTANTS.DELETED_PET.TYPE,
        );
        await petPage.deletePet(CONSTANTS.DELETED_PET.NAME);
        await expect(await petPage.confirmPetAdded(CONSTANTS.DELETED_PET.NAME)).toBe(false);
    });
    
});