function solve(input) {
    class Cat {
        constructor(catName, age) {
            this.catName = catName;
            this.age = age;
        }

        meow (){
            console.log(`${this.catName}, age ${this.age} says Meow`);
        }
    }

    input.forEach(e =>{
        let arr = e.split(' ');
        let cat = new Cat(arr[0], arr[1]);
        cat.meow();
    });
}

solve(['Mellow 2', 'Tom 5'])