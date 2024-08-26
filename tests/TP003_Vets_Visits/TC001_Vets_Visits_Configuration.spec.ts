import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json"
import { MenuNavigation } from '@/pages/navigation';
import { validateTextOnRow, validateTextOnRowTableStriped } from 'src/utilities/utilities';
import { Pets } from '@/pages/pets';
import { Visits } from '@/pages/visits';

test.describe.serial('TC001 - Vets Visits', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add veterinarians visits for their pets', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const ownersPage = await navBarMenu.ownersPage();
        await ownersPage.addNewOwner(
            CONSTANTS.NEW_VISIT.OWNER.FIRST_NAME,
            CONSTANTS.NEW_VISIT.OWNER.LAST_NAME,
            CONSTANTS.NEW_VISIT.OWNER.ADDRESS,
            CONSTANTS.NEW_VISIT.OWNER.CITY,
            CONSTANTS.NEW_VISIT.OWNER.NUMBER
        );
        await ownersPage.searchOwner(CONSTANTS.NEW_VISIT.OWNER.LAST_NAME);
        const ownerTable = await page.locator('.ownerFullName',{hasText:CONSTANTS.NEW_VISIT.OWNER.LAST_NAME}).all()
        await expect(ownerTable).toHaveLength(1)
        await page.getByText(CONSTANTS.NEW_VISIT.OWNER.FULL_NAME).click();

        const petPage = new Pets(page)
        await petPage.addNewPet(
            CONSTANTS.NEW_PET.NAME,
            CONSTANTS.NEW_PET.BIRTH_DATE,
            CONSTANTS.NEW_PET.TYPE,
        );
        await expect(await petPage.confirmPetAdded(CONSTANTS.NEW_PET.NAME)).toBe(true);
        const visitPage = new Visits(page)

        await visitPage.addNewVisit(
            CONSTANTS.NEW_VISIT.PET_NAME,
            CONSTANTS.NEW_VISIT.DATE,
            CONSTANTS.NEW_VISIT.DESCRIPTION,
        );
    });
});