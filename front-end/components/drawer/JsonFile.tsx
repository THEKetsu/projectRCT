/**
 * Import all data from the specified directory and return it as an array.
 *
 * @return {any[]} Array containing all the imported data
 */
const importAllData = () => {
    const context = require.context('../../data', true, /\.json$/);
    const allData: any[] = []; // Initialiser en tant qu'array
    context.keys().forEach((key) => {
        const jsonData = context(key);
        allData.push(jsonData); // Utiliser push pour ajouter chaque élément JSON
    });
    console.log("Data Information : ", allData);
    return allData;
};
export default importAllData;