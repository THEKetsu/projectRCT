// Définissez une fonction pour importer tous les fichiers JSON du dossier data
/*
const importAllData = () => {
    const context = require.context('../../data', true, /\.json$/); // Obtenez le contexte de tous les fichiers JSON dans le dossier data
    const data = {};
    context.keys().forEach((key) => {
        const jsonData = context(key); // Importez chaque fichier JSON
        const fileName = key.replace(/^.*[\\\/]/, '').replace(/\.json$/, ''); // Récupérez le nom du fichier sans extension
        data[fileName] = jsonData; // Ajoutez les données au tableau sous la forme nom de fichier: données JSON
    });
    console.log(data);
    return data;
};

export default importAllData;
*/


const importAllData = () => {
    const context = require.context('../../data', true, /\.json$/);
    const allData : any = [];
    context.keys().forEach((key) => {
        const jsonData = context(key);
        allData.push(jsonData);
    });
    console.log("Data Information : ",allData);
    return allData;
};
export default importAllData;
