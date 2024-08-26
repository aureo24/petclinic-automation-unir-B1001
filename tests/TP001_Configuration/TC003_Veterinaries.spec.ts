import { MenuNavigation } from '@/pages/navigation';
import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json";
import { validateTextOnRow, validateTextOnRowTableStriped } from 'src/utilities/utilities';

test.describe.serial('TC003 - Veterinarians', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add new veterinarian', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const petTypePage = await navBarMenu.veterinariansPage();
        await petTypePage.addNewVeterinarians(
          CONSTANTS.NEW_VETERINARIAN.FIRST_NAME,
          CONSTANTS.NEW_VETERINARIAN.LAST_NAME,
          CONSTANTS.NEW_VETERINARIAN.SPECIALIST
      );
        await expect(await validateTextOnRowTableStriped(page,CONSTANTS.NEW_VETERINARIAN.FULL_NAME,"td")).toBe(true)
     });
  
     test('SC002 - User is able to edit a veterinarians', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const petTypePage = await navBarMenu.veterinariansPage();
        await petTypePage.editVeterinarians(CONSTANTS.NEW_VETERINARIAN.FULL_NAME,CONSTANTS.NEW_VETERINARIAN.VET_NAME_EDITED);
        await expect(await validateTextOnRowTableStriped(page,CONSTANTS.NEW_VETERINARIAN.VET_FULLNAME_EDITED,"td")).toBe(true)
     });

     test('SC003 - User is able to add more than one specialties to a veterinarians', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const petTypePage = await navBarMenu.veterinariansPage();
        await petTypePage.addSpecialties(CONSTANTS.NEW_VETERINARIAN.VET_FULLNAME_EDITED,CONSTANTS.NEW_VETERINARIAN.SPECIALISTS);
        await expect(await validateTextOnRowTableStriped(page,CONSTANTS.NEW_VETERINARIAN.VET_FULLNAME_EDITED,"td")).toBe(true)
     });
  
     test('SC004 - User is able to delete a veterinarians', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const petTypePage = await navBarMenu.veterinariansPage();
        await petTypePage.deleteVeterinarians(CONSTANTS.NEW_VETERINARIAN.VET_FULLNAME_EDITED);
        await expect(await validateTextOnRowTableStriped(page,CONSTANTS.NEW_VETERINARIAN.VET_FULLNAME_EDITED,"td")).toBe(false)
     });
   });
