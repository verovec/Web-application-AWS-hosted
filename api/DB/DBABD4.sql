-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db` DEFAULT CHARACTER SET utf8 ;
USE `db` ;

-- -----------------------------------------------------
-- Table `db`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`role` (
  `id_role` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_role`),
  UNIQUE INDEX `nom_UNIQUE` (`nom` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`user` (
  `id_user` INT NOT NULL AUTO_INCREMENT,
  `civilite` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `role_id` INT NOT NULL,
  `nom` VARCHAR(45) NULL,
  PRIMARY KEY (`id_user`, `role_id`),
  INDEX `fk_user_role_idx` (`role_id` ASC) VISIBLE,
  UNIQUE INDEX `id_user_UNIQUE` (`id_user` ASC) VISIBLE,
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_user_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `db`.`role` (`id_role`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`game`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`game` (
  `id_game` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(255) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_game`),
  UNIQUE INDEX `id_game_UNIQUE` (`id_game` ASC) VISIBLE,
  UNIQUE INDEX `nom_UNIQUE` (`nom` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`reservation` (
  `idReservation` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `VR` TINYINT NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date` DATE NOT NULL,
  PRIMARY KEY (`idReservation`, `user_id`),
  INDEX `fk_reservation_user_idx` (`user_id` ASC) VISIBLE,
  UNIQUE INDEX `idReservation_UNIQUE` (`idReservation` ASC) VISIBLE,
  CONSTRAINT `fk_Reservation_Acheteur1`
    FOREIGN KEY (`user_id`)
    REFERENCES `db`.`user` (`id_user`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`spectateur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`spectateur` (
  `idspectateur` INT NOT NULL AUTO_INCREMENT,
  `civilite` VARCHAR(45) NOT NULL,
  `nom` VARCHAR(45) NOT NULL,
  `prenom` VARCHAR(45) NOT NULL,
  `age` INT NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idspectateur`),
  UNIQUE INDEX `id_spectateur_UNIQUE` (`idspectateur` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`theme` (
  `id_theme` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_theme`),
  UNIQUE INDEX `id_theme_UNIQUE` (`id_theme` ASC) VISIBLE,
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`game_theme`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`game_theme` (
  `game_id` INT NOT NULL,
  `theme_id` INT NOT NULL,
  `position` INT NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`game_id`, `theme_id`),
  INDEX `fk_game_has_theme_theme_idx` (`theme_id` ASC) VISIBLE,
  INDEX `fk_game_has_theme_game_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_Game_has_themes_Game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db`.`game` (`id_game`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Game_has_themes_themes1`
    FOREIGN KEY (`theme_id`)
    REFERENCES `db`.`theme` (`id_theme`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`tarif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`tarif` (
  `id_tarif` INT NOT NULL AUTO_INCREMENT,
  `nom` VARCHAR(45) NOT NULL,
  `prix` DOUBLE NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_tarif`),
  UNIQUE INDEX `id_tarif_UNIQUE` (`id_tarif` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`creneau`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`creneau` (
  `id_creneau` INT NOT NULL AUTO_INCREMENT,
  `horaire` TIME NOT NULL,
  `last_update` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_creneau`),
  UNIQUE INDEX `idcreneau_UNIQUE` (`id_creneau` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`reservation_spectateur`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`reservation_spectateur` (
  `reservation_id` INT NOT NULL,
  `spectateur_id` INT NOT NULL,
  PRIMARY KEY (`reservation_id`, `spectateur_id`),
  INDEX `fk_reservation_has_spectateur_spectateur1_idx` (`spectateur_id` ASC) VISIBLE,
  INDEX `fk_reservation_has_spectateur_reservation1_idx` (`reservation_id` ASC) VISIBLE,
  CONSTRAINT `fk_reservation_has_spectateur_reservation1`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `db`.`reservation` (`idReservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservation_has_spectateur_spectateur1`
    FOREIGN KEY (`spectateur_id`)
    REFERENCES `db`.`spectateur` (`idspectateur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`spectateur_tarif`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`spectateur_tarif` (
  `spectateur_id` INT NOT NULL,
  `tarif_id` INT NOT NULL,
  PRIMARY KEY (`spectateur_id`, `tarif_id`),
  INDEX `fk_spectateur_has_tarif_tarif1_idx` (`tarif_id` ASC) VISIBLE,
  INDEX `fk_spectateur_has_tarif_spectateur1_idx` (`spectateur_id` ASC) VISIBLE,
  CONSTRAINT `fk_spectateur_has_tarif_spectateur1`
    FOREIGN KEY (`spectateur_id`)
    REFERENCES `db`.`spectateur` (`idspectateur`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_spectateur_has_tarif_tarif1`
    FOREIGN KEY (`tarif_id`)
    REFERENCES `db`.`tarif` (`id_tarif`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`game_creneau`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`game_creneau` (
  `game_id` INT NOT NULL,
  `creneau_id` INT NOT NULL,
  `id` INT NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  INDEX `fk_game_has_creneau_creneau1_idx` (`creneau_id` ASC) VISIBLE,
  INDEX `fk_game_has_creneau_game1_idx` (`game_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_creneau_game1`
    FOREIGN KEY (`game_id`)
    REFERENCES `db`.`game` (`id_game`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_creneau_creneau1`
    FOREIGN KEY (`creneau_id`)
    REFERENCES `db`.`creneau` (`id_creneau`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db`.`game_creneau_reservation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db`.`game_creneau_reservation` (
  `reservation_id` INT NOT NULL,
  `game_creneau_id` INT NOT NULL,
  PRIMARY KEY (`reservation_id`, `game_creneau_id`),
  INDEX `fk_game_has_creneau_has_reservation_reservation1_idx` (`reservation_id` ASC) VISIBLE,
  INDEX `fk_game_has_creneau_has_reservation_game_has_creneau1_idx` (`game_creneau_id` ASC) VISIBLE,
  CONSTRAINT `fk_game_has_creneau_has_reservation_reservation1`
    FOREIGN KEY (`reservation_id`)
    REFERENCES `db`.`reservation` (`idReservation`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_game_has_creneau_has_reservation_game_has_creneau1`
    FOREIGN KEY (`game_creneau_id`)
    REFERENCES `db`.`game_creneau` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
