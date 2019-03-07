// const createProductValidator = (
//     manufacturer,
//     description,
//     category,
//     logoUrl,
//     language,
//     catalogueUrl,
//     brandWebSite
// ) => {
//     let validManufacturer = (() => {
//         if (manufacturer.length > 2 && manufacturer !== "") {
//             return true;
//         }
//         return false;
//     })();

//     let validDescription = () => {
//         if (description.length > 10 && manufacturer !== "") {
//             return true;
//         }
//         return false;
//     };

//     let validCategory = (() => {
//         if (category !== "") {
//             return true;
//         }
//         return false;
//     })();

//     let validLogoUrl = (() => {
//         if (
//             (logoUrl.startsWith("https://") || logoUrl.startsWith("http://")) &&
//             logoUrl.length >= 14
//         ) {
//             return true;
//         }
//         return false;
//     })();

//     let validBrandUrl = (() => {
//         if (brandWebSite.startsWith("http://")) {
//             return true;
//         }
//         return false;
//     })();

//     let validLanguage = (() => {
//         if (language.length === 2 && manufacturer !== "") {
//             return true;
//         }
//         return false;
//     })();

//     let validCatalogueUrl = (() => {
//         if (catalogueUrl.startsWith("http://")) {
//             return true;
//         }
//         return false;
//     })();
// };

// export default createProductValidator;