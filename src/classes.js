// private variables
// private class
// restricted methods and properties

// public methods
class Person{
    alive=true;
    constructor(name){
        this.name=name;
    }
}

class Player extends Person{
    constructor(name){
        super(name);
        this.score=0;
    }
}

const p1=new Person('test');
const p=new Player('rahul');
console.log(p1.name)
console.log(p.name, p.alive)