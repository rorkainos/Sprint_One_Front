var chai = require('chai');  
const expect = chai.expect;
const EmployeeValidator = require('../../../app/validator/EmployeeValidator');

describe('EmployeeValidator', function () {
    describe('validateEmployee', function () {
      it('should return null when no errors', () => {
        let employee = {
            salary: "30000",
            fname: "Mocha",
            lname: "Chai",
            email: "test@email.com",
            address: "address",
            address2: "address2",
            city: "city",
            county: "county",
            postalCode: "postalCode",
            country: "country",
            phoneNo: "01234567890",
            bankNo: "12345678",
            nin: "12345678"
        }

        expect(EmployeeValidator.validateEmployee(employee)).to.be.null
      })

      it('should return error when salary not a number', () => {
        let employee = {
            salary: "not a number",
            fname: "Mocha",
            lname: "Chai",
            email: "test@email.com",
            address: "address",
            address2: "address2",
            city: "city",
            county: "county",
            postalCode: "postalCode",
            country: "country",
            phoneNo: "01234567890",
            bankNo: "12345678",
            nin: "nin"
        }

        expect(EmployeeValidator.validateEmployee(employee)).to.equal("Salary must be a number")
      })

    /*
    Unit Test Exercise 1

    Write a unit test for the validateEmployee method

    When the bank number is less than 8 characters

    Expect error to be returned

    This should pass without code changes
     */

    it('should return error when bank number is less than 8 characters', () => {
      let employee = {
          salary: "30000",
          fname: "Mocha",
          lname: "Chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "1234",
          nin: "nin"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("Invalid bank number")
    })

    /*
    Unit Test Exercise 2

    Write a unit test for the validateEmployee method

    When the bank number is more than 8 characters

    Expect error to be returned

    This should pass without code changes
     */

    it('should return error when bank number is more than 8 characters', () => {
      let employee = {
          salary: "30000",
          fname: "Mocha",
          lname: "Chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "1234123456789",
          nin: "nin"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("Invalid bank number")
    })

    /*
    Unit Test Exercise 3

    Write a unit test for the validateEmployee method

    When the first name than 50 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return error when first name more than 50 characters', () => {
      let employee = {
          salary: "30000",
          fname: "1234567891 1234567891 1234567891 1234567891 1234567891",
          lname: "Chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "12345678",
          nin: "nin"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("First Name should be less than 51 character")
    })

    /*
    Unit Test Exercise 4

    Write a unit test for the validateEmployee method

    When the last name than 50 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return error when first name more than 50 characters', () => {
      let employee = {
          salary: "30000",
          fname: "chai",
          lname: "1234567891 1234567891 1234567891 1234567891 1234567891",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "12345678",
          nin: "nin"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("Last Name should be less than 51 character")
    })

    /*
    Unit Test Exercise 5

    Write a unit test for the validateEmployee method

    When the nin is more than 8 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return error when nin is more than 8 characters', () => {
      let employee = {
          salary: "30000",
          fname: "chai",
          lname: "chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "12345678",
          nin: "1234567899"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("nin should be 8 characters")
    })

    /*
    Unit Test Exercise 6

    Write a unit test for the validateEmployee method

    When the nin is less than 8 characters

    Expect error to be returned

    This should fail, make code changes to make this test pass
     */

    it('should return error when nin is more than 8 characters', () => {
      let employee = {
          salary: "30000",
          fname: "chai",
          lname: "chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "12345678",
          nin: "12345"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("nin should be 8 characters")
    })

    /*
    Unit Test Exercise 7

    Write a unit test for the validateEmployee method

    When the salary is less than 20000

    Expect error to be returned

    This should pass without code changes
     */

    it('should return error when Salary is less than £20,000', () => {
      let employee = {
          salary: "1000",
          fname: "chai",
          lname: "chai",
          email: "test@email.com",
          address: "address",
          address2: "address2",
          city: "city",
          county: "county",
          postalCode: "postalCode",
          country: "country",
          phoneNo: "01234567890",
          bankNo: "12345678",
          nin: "12345678"
      }

      expect(EmployeeValidator.validateEmployee(employee)).to.equal("Salary must be at least £20,000")
    })
    })
  })