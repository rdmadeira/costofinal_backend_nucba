import fs from 'fs';
import { Document, ObjectId } from 'mongodb';

import { connectToDB } from './config.js';
import { categories, products, subCategories } from '../../models/schema.js';

function getFlatMapProductsJson() {
  const productsUpdatedPath = new URL(
    '../data/productsUpdated.json',
    import.meta.url
  );
  const productsUpdated = JSON.parse(
    fs.readFileSync(productsUpdatedPath, 'utf-8')
  );
  let products = [];
  for (const category in productsUpdated) {
    if (Object.prototype.hasOwnProperty.call(productsUpdated, category)) {
      const categoryObject = productsUpdated[category];

      for (const subcategory in categoryObject) {
        if (Object.prototype.hasOwnProperty.call(categoryObject, subcategory)) {
          const subCategoryObject = categoryObject[subcategory];

          products.push(subCategoryObject);
        }
      }
    }
  }
  const flatProducts = products.flatMap((ITEM) => ITEM);

  return flatProducts;
}

const categoriesList = [
  { name: 'BRONCE ROSCADO PARA AGUA' },
  { name: 'BRONCE TRAFILADO' },
  { name: 'CODOS Y TEES PARA GAS' },
  { name: 'POLIETILENO' },
  { name: 'POLIPROPILENO' },
  { name: 'REJAS Y TAPAS' },
  { name: 'TERMOCUPLAS' },
  { name: 'TERMOFUSION' },
  { name: 'FERRETERIA' },
];

const subCategoriesList = [
  { name: 'Bridas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Entreroscas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Bujes', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Cuplas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Reducciones', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tapones', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Uniones', category: '64b99b45fce65a50f8b13d21' },
  { name: 'Mariposas', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Prolongaciones', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Virolas', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Bujes de Reduccion', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Uniones', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Conexiones de cocina', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Tetones', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Reducciones', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Tapones', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Cuplas Reducción', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Insertos', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Pernos', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Tuercas', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Nuez', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Cuplas', category: '64b99b45fce65a50f8b13d22' },
  { name: 'Codos Reduccion', category: '64b99b45fce65a50f8b13d23' },
  { name: 'Union Manguera', category: '64b99b45fce65a50f8b13d23' },
  { name: 'Codo Manguera', category: '64b99b45fce65a50f8b13d23' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d23' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d23' },
  { name: 'Espigas reducción', category: '64b99b45fce65a50f8b13d24' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d24' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d24' },
  { name: 'Espigas rosca', category: '64b99b45fce65a50f8b13d24' },
  { name: 'Espigas doble', category: '64b99b45fce65a50f8b13d24' },
  { name: 'Curvas', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Entreroscas', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Tapones', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Bujes Reducción', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Niples', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Cuplas', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Uniones Doble', category: '64b99b45fce65a50f8b13d25' },
  { name: 'Rejas', category: '64b99b45fce65a50f8b13d26' },
  { name: 'Rejillas', category: '64b99b45fce65a50f8b13d26' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d26' },
  { name: 'Termocuplas solas', category: '64b99b45fce65a50f8b13d27' },
  {
    name: 'Termocuplas c/ tuerca & soporte intercamb. ',
    category: '64b99b45fce65a50f8b13d27',
  },
  { name: 'Tuercas', category: '64b99b45fce65a50f8b13d27' },
  { name: 'Soportes', category: '64b99b45fce65a50f8b13d27' },
  {
    name: 'Termocuplas intercambiables solas',
    category: '64b99b45fce65a50f8b13d27',
  },
  { name: 'Cuplas', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Cuplas Inserto', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Uniones Dobles', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Buje Fusion', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Tapas', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Tees', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Tees Inserto', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Codos', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Codos Inserto', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Curvas', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Valvula', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Llaves', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Sobrepasos Largos', category: '64b99b45fce65a50f8b13d28' },
  { name: 'Tarugos SIN tope', category: '64b99b45fce65a50f8b13d29' },
  { name: 'Tarugos CON tope', category: '64b99b45fce65a50f8b13d29' },
  { name: 'CINTAS', category: '64b99b45fce65a50f8b13d29' },
  { name: 'LLANAS', category: '64b99b45fce65a50f8b13d29' },
  { name: 'ESPATULAS', category: '64b99b45fce65a50f8b13d29' },
];

const productsList: Document[] = getFlatMapProductsJson();

/* const busquedaRepetidos = productsList.reduce((acc, product) => {
  acc[product.CODIGO] = ++acc[product.CODIGO] || 0;
  return acc;
}, {});
const duplicados = productsList.filter((persona) => {
  return busquedaRepetidos[persona.CODIGO];
}); */
// console.log('duplicados', duplicados, duplicados.length);

const seedCategoriesToDB = async (
  documents: Document[],
  options: { drop: boolean } = { drop: false }
) => {
  await connectToDB();

  if (options.drop) categories.collection.drop();

  try {
    documents.forEach(async (document) => {
      await categories.updateOne(document, document, { upsert: true }); // Si no existe, agrega, si no mantiene
    });
    console.log('Succesfully upsert many categories documents to database');
  } catch (error) {
    console.log('error', error);
  }
};

const seedsubCategoriesToDB = async (
  documents: Document[],
  options: { drop: boolean } = { drop: false }
) => {
  await connectToDB().then(() => console.log('connected to DB'));

  if (options.drop) subCategories.collection.drop();

  try {
    documents.forEach(async (document) => {
      await subCategories.updateOne(document, document, { upsert: true });
    });
    console.log('Succesfully upsert many subcategories documents to database');
  } catch (error) {
    console.log('error', error);
  }
};

const seedProductsToDB = async (
  documents: Document[],
  options: { drop: boolean } = { drop: false }
) => {
  await connectToDB().then(() => console.log('connected to DB'));

  if (options.drop) products.collection.drop();

  try {
    documents.forEach(async (document) => {
      let subCategory = await subCategories.findOne({ name: document.TIPO });

      await products.updateOne(
        { CODIGO: document.CODIGO },
        {
          CODIGO: document.CODIGO,
          KIT: document.KIT,
          MEDIDA: document.MEDIDA,
          PRECIO: document.PRECIO,
          SUBCATEGORY: subCategory
            ? subCategory._id.toString()
            : new ObjectId('000000000000000000000001'),
        },
        { upsert: true }
      );
    });

    console.log('Succesfully upsert many products documents to database');
  } catch (error) {
    console.log('error', error);
  }
};

// // Ejecutar los seeds por funcion:
// drop: true elimina la colleccion y crea nuevos _id's OJO!!!!!!!
// seedCategoriesToDB(categoriesList /*, { drop: true }) */);

// drop: true elimina la colleccion y crea nuevos _id's OJO!!!!!!!
// seedsubCategoriesToDB(subCategoriesList /* , { drop: true } */);

// drop: true elimina la colleccion y crea nuevos _id's OJO!!!!!!!
// seedProductsToDB(productsList/* , { drop: true } */);
