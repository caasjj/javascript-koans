var _; //globals

describe("About Applying What We Have Learnt", function () {

    var products;

    beforeEach(function () {
        products = [
            { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
            { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
            { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
            { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
            { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
        ];
    });

    /*********************************************************************************/

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {

        var i, j, hasMushrooms, productsICanEat = [];

        for (i = 0; i < products.length; i += 1) {
            if (products[i].containsNuts === false) {
                hasMushrooms = false;
                for (j = 0; j < products[i].ingredients.length; j += 1) {
                    if (products[i].ingredients[j] === "mushrooms") {
                        hasMushrooms = true;
                    }
                }
                if (!hasMushrooms) productsICanEat.push(products[i]);
            }
        }

        expect(productsICanEat.length).toBe(1);
    });

    it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {

        var productsICanEat = [];

        /* solve using filter() & all() / any() */
        productsICanEat = _(products).filter(function (product) {
            return !product.containsNuts && product.ingredients.indexOf('mushrooms') === -1;
        })

        expect(productsICanEat.length).toBe(1);
    });

    /*********************************************************************************/

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {

        var sum = 0;
        for (var i = 1; i < 1000; i += 1) {
            if (i % 3 === 0 || i % 5 === 0) {
                sum += i;
            }
        }

        expect(sum).toBe(233168);
    });

    it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {

        var sum = _.chain(_.union(_.range(0, 1000, 3), _.range(0, 1000, 5))).reduce(function (memo, num) {
            return memo + num;
        }).value();
        /* try chaining range() and reduce() */

        expect(233168).toBe(sum);
    });

    /*********************************************************************************/
    it("should count the ingredient occurrence (imperative)", function () {
        var ingredientCount = { "{ingredient name}": 0 };

        for (i = 0; i < products.length; i += 1) {
            for (j = 0; j < products[i].ingredients.length; j += 1) {
                ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
            }
        }

        expect(ingredientCount['mushrooms']).toBe(2);
    });

    it("should count the ingredient occurrence (functional)", function () {
        var
            ingredientCount = {'mushrooms': 0};
        ingredientCount['mushrooms'] = _.chain(products).map(function (product) {
            return product.ingredients;
        }).flatten().reduce(function (memo, ingredient) {
                if (ingredient === 'mushrooms') {
                    return memo + 1;
                } else {
                    return memo;
                }
            }, 0).value();

        /* chain() together map(), flatten() and reduce() */

        expect(ingredientCount['mushrooms']).toBe(2);
    });

    /*********************************************************************************/
    /* UNCOMMENT FOR EXTRA CREDIT */

    it("should find the largest prime factor of a composite number", function () {
        var
            number = 81 * 19 * 17 * 32,
            result = _.chain(_.range(1, number + 1)).filter(
                function (divisor) {
                    return number % divisor === 0;
                }).filter(
                function (factor) {
                    return _.chain(_.range(2, factor - 1)).every(function (num) {
                        return factor % num != 0 || factor < 4;
                    }).value();
                }).max().value();
        expect(result).toBe(19);
    });


    /*
     it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

     });
     */

    it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
        // Algorithm:
        // 1. Generate all primes < 20
        // 2. Find max power of each prime that is < 20 (i.e. 2^4 = 16 < 20)
        // 3. Push item from 2 on stack R
        // 4. Multiply all items of stack R and return
        var result = [];
        _.chain(_.range(2, 20)).invoke(function () {
            var val = this.valueOf();
            if (val == 2 || _.every(_.range(2, Math.ceil(Math.sqrt(val)) + 1), function (n) {
                return val % n > 0;
            })) {
                while (val * val < 20) val *= val;
                result.push(val);
            }
        });

        result = _.reduce(result, function (memo, num) {
            return memo * num;
        }, 1);

        expect(result).toBe(16 * 9 * 5 * 7 * 11 * 13 * 17 * 19);
    });


    it("should find the difference between the sum of the squares and the square of the sums", function () {
        var
            vector = [1, 4, 3, 10],
            result = _.reduce(vector, function (memo, num) {
                return memo + num * num;
            }) - _.map(_(_.reduce(vector, function (memo, num) {
                return memo + num;
            })), function (num) {
                return num * num;
            });

        expect(result).toBe(126 - 18 * 18);
    });


    it("should find the 10001st prime", function () {
        var result = [1, 2];
        var num = 3;
        // this is totally brute force and slow.  there's got to be better algorithms...
        while (result.length <= 10001) {
            if (_.chain(_.range(2, Math.floor(Math.sqrt(num)) + 1)).every(function (n) {
                return num % n > 0 && num != n;
            }).value()) {
                result.push(num);
            }
            num++;
        }
        expect(result[10001]).toEqual(104743);
    });

});
