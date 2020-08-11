'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.artist.belongsToMany(models.album, { through: 'playlists', onDelete: 'CASCADE' });
    }
  };
  artist.init({
    name: DataTypes.STRING,
    city: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'artist',
  });
  return artist;
};