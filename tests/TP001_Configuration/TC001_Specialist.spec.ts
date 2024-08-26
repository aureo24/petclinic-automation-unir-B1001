import { MenuNavigation } from '@/pages/navigation';
import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json";
import { validateTextOnRow } from 'src/utilities/utilities';

test.describe.serial('TC001 - Specialist', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });

    test('SC001 - User is able to add new Speciality', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const specialistPage = await navBarMenu.specialtiesPage();
        await specialistPage.addNewSpeciality(CONSTANTS.NEW_SPECIALIST.NEUROLOGY);
        await expect(await validateTextOnRow(page,CONSTANTS.NEW_SPECIALIST.NEUROLOGY,"input[name='spec_name']")).toBe(true)
     });

     test('SC002 - User is able to edit a Speciality', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const specialistPage = await navBarMenu.specialtiesPage();
        await specialistPage.editSpeciality(CONSTANTS.NEW_SPECIALIST.NEUROLOGY,CONSTANTS.NEW_SPECIALIST.SPECIALIST_EDITED);
        await expect(await validateTextOnRow(page,CONSTANTS.NEW_SPECIALIST.SPECIALIST_EDITED,"input[name='spec_name']")).toBe(true)
     });

     test('SC003 - User is able to delete a Speciality', async ({ page }) => {
        const navBarMenu = new MenuNavigation(page);
        const specialistPage = await navBarMenu.specialtiesPage();
        await specialistPage.deleteSpeciality(CONSTANTS.NEW_SPECIALIST.SPECIALIST_EDITED);
        await expect(await validateTextOnRow(page,CONSTANTS.NEW_SPECIALIST.SPECIALIST_EDITED,"input[name='spec_name']")).toBe(false)
     });
    
});
