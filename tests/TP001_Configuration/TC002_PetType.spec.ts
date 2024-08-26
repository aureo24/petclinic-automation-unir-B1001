import { MenuNavigation } from '@/pages/navigation';
import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json";
import { validateTextOnRow } from 'src/utilities/utilities';

test.describe.serial('TC002 - Pet Type', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add new Pet Type', async ({ page }) => {
      const navBarMenu = new MenuNavigation(page);
      const petTypePage = await navBarMenu.petTypePage();
      await petTypePage.addNewPetType(CONSTANTS.NEW_PETTYPE.COW);
      await expect(await validateTextOnRow(page,CONSTANTS.NEW_PETTYPE.COW,"input[name='pettype_name']")).toBe(true)
   });

   test('SC002 - User is able to edit a  Pet Type', async ({ page }) => {
      const navBarMenu = new MenuNavigation(page);
      const petTypePage = await navBarMenu.petTypePage();
      await petTypePage.editPetType(CONSTANTS.NEW_PETTYPE.COW,CONSTANTS.NEW_PETTYPE.PETTYPE_EDITED);
      await expect(await validateTextOnRow(page,CONSTANTS.NEW_PETTYPE.PETTYPE_EDITED,"input[name='pettype_name']")).toBe(true)
   });

   test('SC003 - User is able to delete a Pet Type', async ({ page }) => {
      const navBarMenu = new MenuNavigation(page);
      const petTypePage = await navBarMenu.petTypePage();
      await petTypePage.deletePetType(CONSTANTS.NEW_PETTYPE.PETTYPE_EDITED);
      await expect(await validateTextOnRow(page,CONSTANTS.NEW_PETTYPE.PETTYPE_EDITED,"input[name='pettype_name']")).toBe(false)
   });
    
});
