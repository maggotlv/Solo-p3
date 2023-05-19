'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movies extends Model {
    static associate(models) {
      this.belongsTo(models.Users, { foreignKey: 'userId'});
    }
  }
  Movies.init({
    userId: DataTypes.INTEGER,
    movieID: DataTypes.STRING,
    watched: DataTypes.BOOLEAN,
    myRating: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movies',
  });
  return Movies;
};