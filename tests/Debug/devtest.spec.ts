import { test, expect } from '@playwright/test';
import CONSTANTS from "../../src/data/CONSTANTS.json"
import { MenuNavigation } from '@/pages/navigation';
import { validateTextOnRow, validateTextOnRowTableStriped } from 'src/utilities/utilities';
import { Pets } from '@/pages/pets';
import { Visits } from '@/pages/visits';

test.describe.serial('@debug - DEBUG', () => {
    test.beforeEach(async ({ page }) =>{
        await page.goto('.');
    });
  
    test('Debug', async ({ page }) => {
        
    });
    
});
