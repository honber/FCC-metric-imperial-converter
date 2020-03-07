/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const math = require("mathjs");

function ConvertHandler() {
  const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

  this.getNum = function(input) {
    
    
    function inputStringCotntainsTwoSlashChars(inputString) {
      return (/.*\/.*\/.*/).test(inputString)
    }
    
    function isStringAValidNumber(inputString) {
      if (inputString === "") {
        return 1;
      } else if (inputStringCotntainsTwoSlashChars(inputString)){
          return "invalid number";
      } else if (Number(inputString)) {
          return inputString;
      } else {
        try {
          return math.evaluate(inputString);
        } catch (error) {
          console.log(`${error}, ${inputString} is not a valid number`);
          return "invalid number";
        }
      }
    }

    function numberFromInput(input) {
      let indexOfLastNonLetterCharInInput = input.length - 1;
      if (!/[a-z, A-Z]/.test(input.charAt(indexOfLastNonLetterCharInInput))) {
        return isStringAValidNumber(input);
      } else {
        for (let i = input.length - 2; i >= 0; i--) {
          if (/[a-z, A-Z]/.test(input.charAt(i))) {
            indexOfLastNonLetterCharInInput = i;
          } else {
            break;
          }
        }
      }
      return isStringAValidNumber(
        input.substr(0, indexOfLastNonLetterCharInInput)
      );
    }
    return numberFromInput(input);
  };

  this.getUnit = function(input) {
    function isStringAValidUnit(inputString) {
      const unitToValidate = inputString.toLowerCase();
      return validUnits.includes(unitToValidate)
        ? unitToValidate
        : "invalid unit";
    }

    function unitsFromInput(input) {
      let indexOfLastLetterCharInInput = input.length - 1;

      if (
        indexOfLastLetterCharInInput === -1 ||
        !/[a-z, A-Z]/.test(input.charAt(indexOfLastLetterCharInInput))
      ) {
        return "invalid unit";
      } else {
        for (let i = input.length - 2; i >= 0; i--) {
          if (/[a-z, A-Z]/.test(input.charAt(i))) {
            indexOfLastLetterCharInInput = i;
          } else {
            break;
          }
        }
      }
      return isStringAValidUnit(input.substring(indexOfLastLetterCharInInput));
    }

    return unitsFromInput(input);
  };

  this.getReturnUnit = function(initUnit) {
    let result;

    switch (initUnit) {
      case "gal":
        result = "l";
        break;
      case "l":
        result = "gal";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      case "lbs":
        result = "kg";
        break;
      case "kg":
        result = "lbs";
        break;
      default:
        result = "not specified";
    }
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;

    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "mi":
        result = "miles";
        break;
      case "km":
        result = "kilometers";
        break;
      case "lbs":
        result = "pounds";
        break;
      case "kg":
        result = "kilograms";
        break;
      default:
        result = "not specified";
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result = "not specified";

    if (initNum !== "invalid number") {
      switch (initUnit) {
        case "l":
          result = initNum / galToL;
          break;
        case "gal":
          result = initNum * galToL;
          break;
        case "km":
          result = initNum / miToKm;
          break;
        case "mi":
          result = initNum * miToKm;
          break;
        case "kg":
          result = initNum / lbsToKg;
          break;
        case "lbs":
          result = initNum * lbsToKg;
          break;
        default:
          result = "not specified";
      }
    }
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    if (initNum === "invalid number" && initUnit === "invalid unit") {
      result = { error: "invalid number and unit" };
    } else if (initNum === "invalid number") {
      result = { error: "invalid number" };
    } else if (initUnit === "invalid unit") {
      result = { error: "invalid unit" };
    } else {
      result = {
        initNum,
        initUnit,
        returnUnit,
        returnNum,
        string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`
      };
    }
    return result;
  };
}

module.exports = ConvertHandler;
