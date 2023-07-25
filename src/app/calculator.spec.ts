import { Calculator } from './calculator'

describe('test for calculator', () => {



    describe('test for multiply',()=>{


        it('#multiply should return a nine', () => {
            ///aaa
            //arrange
            const calculator = new Calculator();
            //act
            const rta = calculator.multiply(3, 3);
            //assert
            expect(rta).toEqual(9);
        })
    
        it('#multiply should return a four', () => {
            ///aaa
            //arrange
            const calculator = new Calculator();
            //act
            const rta = calculator.multiply(1, 4);
            //assert
            expect(rta).toEqual(4);
        })
    
        it('#divide should return a some numbers', () => {
            ///aaa
            //arrange
            const calculator = new Calculator();
            expect(calculator.divide(6, 3)).toEqual(2);
            expect(calculator.divide(5, 2)).toEqual(2.5);
        })
    
        it('test matchers', () => {
            ///aaa
            //arrange
            const name = 'nicolas';
            let name2;
    
            expect(name).toBeDefined();
            expect(name2).toBeUndefined();
    
            expect(1 + 3 === 4).toBeTruthy();
            expect(1 + 1 === 3).toBeFalsy();
    
    
            expect(5).toBeLessThan(10);
            expect(20).toBeGreaterThan(2);
            expect('123456').toMatch(/123/);
        })
    })


    describe('test for divide',()=>{

        it('#divide should return null', () => {
            ///aaa
            //arrange
            const calculator = new Calculator();
            expect(calculator.divide(6, 0)).toBeNull();
            expect(calculator.divide(5, 0)).toBeNull();
        })
    })
})