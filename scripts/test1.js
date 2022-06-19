function Dog(name, age, color){
    this.name = name;
    this.age = age;
    this.color = color;

    this.bark = function(){
        console.log("I'm barking");
    };
}

class Cat {
    constructor(name, age, color){
        this.name = name;
        this.age = age;
        this.color = color;
    }
    meow(){
        console.log("I'm meowing");
    }
}

function testObjects(){
    let dog1 = {
    };

    let dog2 = {
    };

    console.log(dog1, dog2);

    //Object constructor
    let dog3 = new Dog("Dudley", 11, "white");
    let dog4 = new Dog("Astro", 60, "gray");
    console.log(dog3, dog4);
    console.log(dog3.name);
    dog3.bark();

    // Classes
    let cat1 = new Cat("Kitty", 11, "tan");
    let cat2 = new Cat("DrMeowsalot", 4, "gray");
    console.log(cat1, cat2);
    console.log(cat1.name);
    cat1.meow();

}

function runTests(){
    console.log("-----TESTS-----");
    testObjects();
}