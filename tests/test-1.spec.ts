import {test, expect} from '@playwright/test';

test.describe('Navegation to www.freerangetesters.com', () => {

  const secciones = [
    { nombre: 'Cursos', url: '/cursos', tituloEsperado: 'Cursos'},
    { nombre: 'Udemy', url: '/udemy', tituloEsperado: 'Udemy'},
    { nombre: 'Recursos', url: '/recursos', tituloEsperado: 'Recursos'},
    { nombre: 'Blog', url: '/blog', tituloEsperado: 'Free Range Testers'}
  ];
  for (const seccion of secciones) {

    test(`Los links principales redirigen correctamente a la seccion de ${seccion.nombre}`, async ({page}) => {

      await test.step('Estando yo en la web principal de Free Range Testers', async () => {
        await page.goto('https://www.freerangetesters.com')
        await expect(page).toHaveTitle('Free Range Testers');
      })

      await test.step(`Cuando hago click en "${seccion.nombre}"`, async () => {
        await page.getByRole('link', {name: seccion.nombre, exact: true}).click();
        await page.waitForURL(`**${seccion.url}`);
      })

      await test.step(`Soy redirigido a la seccion de título "${seccion.tituloEsperado}"`, async () => {
        await expect(page).toHaveURL(new RegExp(`.*${seccion.url.replace('/', '')}`));
        await expect(page).toHaveTitle(seccion.tituloEsperado);
      })
    });
  }
})

//Filtrado de elementos por texto
await page.getByRole('listitem')
  .filter({ hasText: 'Cursos' })
  .getByRole('button', { name: 'Comprar' })
  .click();

//Filtrado de elementos por locator (mas robusto)
await page.getByRole('listitem')
  .filter({ has: page.getbyRole('heading', { name: 'Cursos' }) })
  .getByRole('button', { name: 'Comprar' })
  .click();

