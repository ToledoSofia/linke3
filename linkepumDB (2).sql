-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema Linkepum
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Linkepum
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Linkepum` DEFAULT CHARACTER SET ascii ;
USE `Linkepum` ;

-- -----------------------------------------------------
-- Table `Linkepum`.`Grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Grupos` (
  `idGrupos` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(150) NOT NULL,
  `descripcion` VARCHAR(300) NULL DEFAULT NULL,
  `fecha_creacion` DATE NULL DEFAULT NULL,
  `promedio_rankin` VARCHAR(45) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(100) NULL DEFAULT NULL,
  `usuario` VARCHAR(50) NOT NULL,
  `contrasena` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idGrupos`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Instrumento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Instrumento` (
  `idInstrumento` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `tipo_instrumento` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idInstrumento`))
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Musico`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Musico` (
  `idMusico` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(100) NOT NULL,
  `apellido` VARCHAR(100) NULL DEFAULT NULL,
  `descripcion` VARCHAR(300) NULL DEFAULT NULL,
  `ubicacion` VARCHAR(100) NULL DEFAULT NULL,
  `usuario` VARCHAR(50) NOT NULL,
  `contrasena` VARCHAR(100) NOT NULL,
  `foto_perfil` VARCHAR(500) NULL DEFAULT NULL,
  `foto_portada` VARCHAR(500) NULL DEFAULT NULL,
  PRIMARY KEY (`idMusico`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Publicacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Publicacion` (
  `idPublicacion` INT NOT NULL AUTO_INCREMENT,
  `imagen` VARCHAR(500) NULL DEFAULT NULL,
  `texto` VARCHAR(100) NULL DEFAULT NULL,
  `fecha_publicacion` VARCHAR(45) NOT NULL,
  `Grupos_idGrupos` INT NULL DEFAULT NULL,
  `Musico_idMusico` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idPublicacion`),
  INDEX `fk_Publicacion_Grupos1_idx` (`Grupos_idGrupos` ASC) VISIBLE,
  INDEX `fk_Publicacion_Musico1_idx` (`Musico_idMusico` ASC) VISIBLE,
  CONSTRAINT `fk_Publicacion_Grupos1`
    FOREIGN KEY (`Grupos_idGrupos`)
    REFERENCES `Linkepum`.`Grupos` (`idGrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Publicacion_Musico1`
    FOREIGN KEY (`Musico_idMusico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Ranking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Ranking` (
  `idRanking` INT NOT NULL AUTO_INCREMENT,
  `cantidad` FLOAT NULL DEFAULT NULL,
  `Grupos_idGrupos` INT NOT NULL,
  `Musico_idMusico` INT NOT NULL,
  PRIMARY KEY (`idRanking`),
  INDEX `fk_Ranking_Grupos1_idx` (`Grupos_idGrupos` ASC) VISIBLE,
  INDEX `fk_Ranking_Musico1_idx` (`Musico_idMusico` ASC) VISIBLE,
  CONSTRAINT `fk_Ranking_Grupos1`
    FOREIGN KEY (`Grupos_idGrupos`)
    REFERENCES `Linkepum`.`Grupos` (`idGrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Ranking_Musico1`
    FOREIGN KEY (`Musico_idMusico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`grupos_musicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`grupos_musicos` (
  `idAsociacion` INT NOT NULL AUTO_INCREMENT,
  `Grupos_idGrupos` INT NOT NULL,
  `Musico_idMusico` INT NOT NULL,
  `activo` TINYINT NOT NULL,
  PRIMARY KEY (`idAsociacion`, `Grupos_idGrupos`, `Musico_idMusico`),
  INDEX `fk_grupos_musicos_Musico1_idx` (`Musico_idMusico` ASC) VISIBLE,
  INDEX `fk_grupos_musicos_Grupos` (`Grupos_idGrupos` ASC) VISIBLE,
  CONSTRAINT `fk_grupos_musicos_Grupos`
    FOREIGN KEY (`Grupos_idGrupos`)
    REFERENCES `Linkepum`.`Grupos` (`idGrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_grupos_musicos_Musico1`
    FOREIGN KEY (`Musico_idMusico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 8
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Rol` (
  `idRol` INT NOT NULL AUTO_INCREMENT,
  `Instrumento_idInstrumento` INT NOT NULL,
  `grupos_musicos_idAsociacion` INT NOT NULL,
  PRIMARY KEY (`idRol`, `Instrumento_idInstrumento`, `grupos_musicos_idAsociacion`),
  INDEX `fk_Rol_Instrumento1_idx` (`Instrumento_idInstrumento` ASC) VISIBLE,
  INDEX `fk_Rol_grupos_musicos1_idx` (`grupos_musicos_idAsociacion` ASC) VISIBLE,
  CONSTRAINT `fk_Rol_grupos_musicos1`
    FOREIGN KEY (`grupos_musicos_idAsociacion`)
    REFERENCES `Linkepum`.`grupos_musicos` (`idAsociacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Rol_Instrumento1`
    FOREIGN KEY (`Instrumento_idInstrumento`)
    REFERENCES `Linkepum`.`Instrumento` (`idInstrumento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 4
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Solicitud`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Solicitud` (
  `idSolicitud` INT NOT NULL AUTO_INCREMENT,
  `fecha_solicitud` DATETIME NOT NULL,
  `grupo` INT NOT NULL,
  `musico` INT NOT NULL,
  `tipo` VARCHAR(45) NOT NULL,
  `estado` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idSolicitud`, `grupo`, `musico`),
  INDEX `fk_Solicitud_Grupos1_idx` (`grupo` ASC) VISIBLE,
  INDEX `fk_Solicitud_Musico1_idx` (`musico` ASC) VISIBLE,
  CONSTRAINT `fk_Solicitud_Grupos1`
    FOREIGN KEY (`grupo`)
    REFERENCES `Linkepum`.`Grupos` (`idGrupos`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Solicitud_Musico1`
    FOREIGN KEY (`musico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`musico_instrumento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`musico_instrumento` (
  `Musico_idMusico` INT NOT NULL,
  `Instrumento_idInstrumento` INT NOT NULL,
  PRIMARY KEY (`Musico_idMusico`, `Instrumento_idInstrumento`),
  INDEX `fk_musico_instrumento_Instrumento1_idx` (`Instrumento_idInstrumento` ASC) VISIBLE,
  CONSTRAINT `fk_musico_instrumento_Instrumento1`
    FOREIGN KEY (`Instrumento_idInstrumento`)
    REFERENCES `Linkepum`.`Instrumento` (`idInstrumento`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_musico_instrumento_Musico1`
    FOREIGN KEY (`Musico_idMusico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = ascii;


-- -----------------------------------------------------
-- Table `Linkepum`.`Rating_instrumento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Linkepum`.`Rating_instrumento` (
  `idRating_instrumento` INT NOT NULL AUTO_INCREMENT,
  `cantidad` FLOAT NULL DEFAULT 0,
  `Musico_idMusico` INT NOT NULL,
  `Instrumento_idInstrumento` INT NOT NULL,
  `rate_user` INT NOT NULL,
  PRIMARY KEY (`idRating_instrumento`),
  INDEX `fk_Rating_instrumento_Musico1_idx` (`Musico_idMusico` ASC) VISIBLE,
  INDEX `fk_Rating_instrumento_Instrumento1_idx` (`Instrumento_idInstrumento` ASC) VISIBLE,
  INDEX `fk_Rating_instrumento_Musico2_idx` (`rate_user` ASC) VISIBLE,
  CONSTRAINT `fk_Rating_instrumento_Musico1`
    FOREIGN KEY (`Musico_idMusico`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rating_instrumento_Instrumento1`
    FOREIGN KEY (`Instrumento_idInstrumento`)
    REFERENCES `Linkepum`.`Instrumento` (`idInstrumento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Rating_instrumento_Musico2`
    FOREIGN KEY (`rate_user`)
    REFERENCES `Linkepum`.`Musico` (`idMusico`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
use Linkepum;

ALTER TABLE Grupos DROP COLUMN usuario,DROP COLUMN contrasena;

select * from Rol;
insert into Instrumento (nombre, tipo_instrumento) values ("Guitarra", "Cuerda");
insert into Instrumento (nombre, tipo_instrumento) values ("Bateria", "Percusion");
insert into Instrumento (nombre, tipo_instrumento) values ("Bajo", "Cuerda");
insert into Instrumento (nombre, tipo_instrumento) values ("Voz", "-");

INSERT INTO Rol (Instrumento_idInstrumento, grupos_musicos_idAsociacion) VALUES (2, 4);
select * from grupos_musicos;
ALTER TABLE `Grupos` CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
insert into Instrumento (nombre, tipo_instrumento) values ("Guitarra", "cuerda");
insert into Instrumento (nombre, tipo_instrumento) values ("Bajo", "cuerda");
insert into Instrumento (nombre, tipo_instrumento) values ("Bateria", "percusion");
insert into Instrumento (nombre, tipo_instrumento) values ("Voz", null);
select * from Instrumento;


describe Instrumento;
INSERT INTO `Rol` (`idRol`,`Instrumento_idInstrumento`,`grupos_musicos_idAsociacion`) VALUES (DEFAULT,1,24);
select * from Instrumento;