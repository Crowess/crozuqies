const fs = require("fs");

class FileSystemManager {
  constructor() {}
  /**
   * Vérifie si un fichier existe avec fs
   * @param file: le fichier à vérifier
   * @returns rien si le fichier existe. Sinon, lancer une erreur
   */
  async checkFile(file) {
    return await fs.promises.access(file, fs.constants.R_OK);
  }

  /**
   * Écrit les données dans un fichier
   * @param {string} path : le chemin qui correspond au fichier JSON
   * @param {string} data : l'information à sauvegarder en string
   * @returns {Promise<void>} aucune valeur retournée
   */
  async writeToJsonFile(path, data) {
    return await fs.promises.writeFile(path, data);
  }

  /**
   * Lit et retourne le contenu d'un fichier
   * @param {string} path : le chemin qui correspond au fichier JSON
   * @returns {Promise<Buffer>} le contenu du fichier sous la forme de Buffer
   */
  async readFile(path) {
    return await fs.promises.readFile(path);
  }
}

module.exports = { FileSystemManager };